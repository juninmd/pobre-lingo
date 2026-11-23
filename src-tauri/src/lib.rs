mod shell;
mod state;

pub fn run() {
    tauri::Builder::default()
        // Primeiro: uma segunda execução só traz a janela existente para a frente.
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            shell::show_main(app)
        }))
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec!["--minimized"]),
        ))
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(shell::on_shortcut)
                .build(),
        )
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .setup(shell::setup)
        .on_window_event(|window, event| shell::on_window_event(window, event))
        .invoke_handler(tauri::generate_handler![
            state::read_state,
            state::write_state,
            state::mark_first_run_done,
            shell::set_due_count
        ])
        .run(tauri::generate_context!())
        .expect("erro ao iniciar o Pobre Lingo");
}
