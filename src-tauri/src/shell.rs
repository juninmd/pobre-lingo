//! Casca nativa: bandeja, fechar-para-bandeja, atalho global e janela única.

use tauri::{
    menu::{Menu, MenuItem, PredefinedMenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Emitter, Manager, Window, WindowEvent, Wry,
};
use tauri_plugin_global_shortcut::{Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutEvent, ShortcutState};

/// Item "Revisar agora" do menu da bandeja, para atualizar a contagem.
pub struct ReviewItem(pub MenuItem<Wry>);

pub fn show_main(app: &AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.unminimize();
        let _ = window.show();
        let _ = window.set_focus();
    }
}

fn navigate(app: &AppHandle, route: &str) {
    show_main(app);
    let _ = app.emit("desktop://navigate", route.to_string());
}

fn capture(app: &AppHandle) {
    show_main(app);
    let _ = app.emit("desktop://capture", ());
}

pub fn starts_minimized(args: &[String]) -> bool {
    args.iter().any(|arg| arg == "--minimized")
}

pub fn review_label(count: u32) -> String {
    match count {
        0 => "Revisar agora".to_string(),
        n => format!("Revisar agora ({n} cards)"),
    }
}

pub fn on_shortcut(app: &AppHandle, _shortcut: &Shortcut, event: ShortcutEvent) {
    if event.state() == ShortcutState::Pressed {
        capture(app);
    }
}

/// Fechar a janela só a esconde: lembretes e atalho seguem ativos. "Sair" fica na bandeja.
pub fn on_window_event(window: &Window, event: &WindowEvent) {
    if let WindowEvent::CloseRequested { api, .. } = event {
        api.prevent_close();
        let _ = window.hide();
    }
}

pub fn setup(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error>> {
    let open = MenuItem::with_id(app, "open", "Abrir Pobre Lingo", true, None::<&str>)?;
    let review = MenuItem::with_id(app, "review", review_label(0), true, None::<&str>)?;
    let cap = MenuItem::with_id(app, "capture", "Capturar palavra (Ctrl+Alt+D)", true, None::<&str>)?;
    let quit = MenuItem::with_id(app, "quit", "Sair", true, None::<&str>)?;
    let sep = PredefinedMenuItem::separator(app)?;
    let menu = Menu::with_items(app, &[&open, &review, &cap, &sep, &quit])?;
    app.manage(ReviewItem(review));

    let mut tray = TrayIconBuilder::with_id("main")
        .tooltip("Pobre Lingo")
        .menu(&menu)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "open" => show_main(app),
            "review" => navigate(app, "/review"),
            "capture" => capture(app),
            "quit" => app.exit(0),
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                show_main(tray.app_handle());
            }
        });
    if let Some(icon) = app.default_window_icon().cloned() {
        tray = tray.icon(icon);
    }
    tray.build(app)?;

    let shortcut = Shortcut::new(Some(Modifiers::CONTROL | Modifiers::ALT), Code::KeyD);
    if let Err(error) = app.global_shortcut().register(shortcut) {
        eprintln!("atalho Ctrl+Alt+D indisponível: {error}");
    }

    let args: Vec<String> = std::env::args().collect();
    if starts_minimized(&args) {
        if let Some(window) = app.get_webview_window("main") {
            let _ = window.hide();
        }
    }
    Ok(())
}

/// Atualiza o texto e a dica da bandeja com a quantidade de cards vencidos.
#[tauri::command]
pub fn set_due_count(app: AppHandle, count: u32) -> Result<(), String> {
    let item = app.state::<ReviewItem>();
    item.0.set_text(review_label(count)).map_err(|e| e.to_string())?;
    if let Some(tray) = app.tray_by_id("main") {
        let tip = format!("Pobre Lingo · {count} cards vencidos");
        tray.set_tooltip(Some(tip)).map_err(|e| e.to_string())?;
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn minimized_flag_is_detected() {
        assert!(starts_minimized(&["app.exe".into(), "--minimized".into()]));
        assert!(!starts_minimized(&["app.exe".into()]));
    }

    #[test]
    fn review_label_shows_count_only_when_due() {
        assert_eq!(review_label(0), "Revisar agora");
        assert_eq!(review_label(12), "Revisar agora (12 cards)");
    }
}
