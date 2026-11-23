mod state;

pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            state::read_state,
            state::write_state,
            state::mark_first_run_done
        ])
        .run(tauri::generate_context!())
        .expect("erro ao iniciar o Pobre Lingo");
}
