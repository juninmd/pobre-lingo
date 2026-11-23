//! Estado do app em arquivo: o localStorage do WebView2 é só cache.
//! Escrita atômica (tmp + rename) e rotação de cópias em `backups/`.

use serde::Serialize;
use std::{
    fs,
    io::{ErrorKind, Write},
    path::{Path, PathBuf},
    time::{SystemTime, UNIX_EPOCH},
};
use tauri::{AppHandle, Manager};

const STATE_FILE: &str = "state.json";
const BACKUP_DIR: &str = "backups";
const FIRST_RUN_MARK: &str = "first_run.done";
const KEEP: usize = 5;
const MIN_GAP_SECS: u64 = 15 * 60;
const MAX_BYTES: usize = 8 * 1024 * 1024;

#[derive(Serialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct StateInfo {
    pub state: Option<String>,
    pub first_run_done: bool,
    pub dir: String,
}

fn now_secs() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0)
}

fn data_dir(app: &AppHandle) -> Result<PathBuf, String> {
    let dir = app.path().app_data_dir().map_err(|e| e.to_string())?;
    fs::create_dir_all(&dir).map_err(|e| e.to_string())?;
    Ok(dir)
}

pub fn read_in(dir: &Path) -> Result<StateInfo, String> {
    let state = match fs::read_to_string(dir.join(STATE_FILE)) {
        Ok(text) => Some(text),
        Err(e) if e.kind() == ErrorKind::NotFound => None,
        Err(e) => return Err(e.to_string()),
    };
    Ok(StateInfo {
        state,
        first_run_done: dir.join(FIRST_RUN_MARK).exists(),
        dir: dir.display().to_string(),
    })
}

fn backups(dir: &Path) -> Vec<(u64, PathBuf)> {
    let mut found: Vec<(u64, PathBuf)> = fs::read_dir(dir.join(BACKUP_DIR))
        .into_iter()
        .flatten()
        .flatten()
        .filter_map(|entry| {
            let path = entry.path();
            let name = path.file_name()?.to_str()?.to_string();
            let secs = name.strip_prefix("state-")?.strip_suffix(".json")?;
            Some((secs.parse().ok()?, path))
        })
        .collect();
    found.sort();
    found
}

/// Guarda o estado atual em `backups/` (no máximo uma cópia por 15 min, 5 no total).
fn rotate(dir: &Path, now: u64) -> Result<(), String> {
    let mut list = backups(dir);
    let recent = list.last().is_some_and(|(t, _)| now.saturating_sub(*t) < MIN_GAP_SECS);
    if !recent {
        let bdir = dir.join(BACKUP_DIR);
        fs::create_dir_all(&bdir).map_err(|e| e.to_string())?;
        let copy = bdir.join(format!("state-{now}.json"));
        fs::copy(dir.join(STATE_FILE), &copy).map_err(|e| e.to_string())?;
        list.push((now, copy));
    }
    while list.len() > KEEP {
        let (_, old) = list.remove(0);
        let _ = fs::remove_file(old);
    }
    Ok(())
}

pub fn write_in(dir: &Path, json: &str, now: u64) -> Result<(), String> {
    if json.len() > MAX_BYTES {
        return Err("estado grande demais".into());
    }
    let target = dir.join(STATE_FILE);
    if target.exists() {
        rotate(dir, now)?;
    }
    let tmp = dir.join("state.json.tmp");
    {
        let mut file = fs::File::create(&tmp).map_err(|e| e.to_string())?;
        file.write_all(json.as_bytes()).map_err(|e| e.to_string())?;
        file.sync_all().map_err(|e| e.to_string())?;
    }
    fs::rename(&tmp, &target).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn read_state(app: AppHandle) -> Result<StateInfo, String> {
    read_in(&data_dir(&app)?)
}

#[tauri::command]
pub fn write_state(app: AppHandle, json: String) -> Result<(), String> {
    write_in(&data_dir(&app)?, &json, now_secs())
}

#[tauri::command]
pub fn mark_first_run_done(app: AppHandle) -> Result<(), String> {
    fs::write(data_dir(&app)?.join(FIRST_RUN_MARK), b"1").map_err(|e| e.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn temp(name: &str) -> PathBuf {
        let dir = std::env::temp_dir().join(format!("pl-state-{name}-{}", now_secs()));
        let _ = fs::remove_dir_all(&dir);
        fs::create_dir_all(&dir).unwrap();
        dir
    }

    #[test]
    fn missing_state_reads_as_none() {
        let dir = temp("none");
        let info = read_in(&dir).unwrap();
        assert!(info.state.is_none() && !info.first_run_done);
    }

    #[test]
    fn write_then_read_roundtrips_and_leaves_no_tmp() {
        let dir = temp("rt");
        write_in(&dir, "{\"a\":\"1\"}", 1000).unwrap();
        assert_eq!(read_in(&dir).unwrap().state.as_deref(), Some("{\"a\":\"1\"}"));
        assert!(!dir.join("state.json.tmp").exists());
    }

    #[test]
    fn rotation_keeps_five_and_spaces_copies() {
        let dir = temp("rot");
        write_in(&dir, "0", 1000).unwrap();
        for i in 1..=8u64 {
            write_in(&dir, &i.to_string(), 1000 + i * MIN_GAP_SECS).unwrap();
        }
        assert_eq!(backups(&dir).len(), KEEP);
        // Dentro do intervalo mínimo não cria cópia nova.
        let before = backups(&dir).len();
        write_in(&dir, "x", 1000 + 8 * MIN_GAP_SECS + 5).unwrap();
        assert_eq!(backups(&dir).len(), before);
    }

    #[test]
    fn rejects_oversized_state() {
        let dir = temp("big");
        let huge = "a".repeat(MAX_BYTES + 1);
        assert!(write_in(&dir, &huge, 1).is_err());
    }
}
