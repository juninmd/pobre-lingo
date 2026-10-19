import { createServer } from "node:http";
import { createApp } from "./app.mjs";
import { createPgStore } from "./store.mjs";

const { DATABASE_URL, PORT = "3000", ALLOWED_ORIGIN = "*" } = process.env;
if (!DATABASE_URL) {
	console.error("DATABASE_URL não definida");
	process.exit(1);
}

const store = createPgStore(DATABASE_URL);
await store.init();

const server = createServer(createApp({ store, allowedOrigin: ALLOWED_ORIGIN }));
server.listen(Number(PORT), () => console.log(`pobre-lingo-api na porta ${PORT}`));

const shutdown = () => {
	server.close(() => store.close().finally(() => process.exit(0)));
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
