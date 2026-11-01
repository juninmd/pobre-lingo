import { createServer } from "node:http";
import { createApp } from "./app.mjs";
import { createChat } from "./chat.mjs";
import { createPgStore } from "./store.mjs";

const {
	DATABASE_URL,
	PORT = "3000",
	ALLOWED_ORIGIN = "*",
	LITELLM_BASE_URL = "http://litellm.ai.svc.cluster.local:4000/v1",
	LITELLM_API_KEY,
	LITELLM_MODEL = "cloud/auto",
} = process.env;
if (!DATABASE_URL) {
	console.error("DATABASE_URL não definida");
	process.exit(1);
}

const store = createPgStore(DATABASE_URL);
await store.init();

const chat = createChat({
	baseUrl: LITELLM_BASE_URL,
	apiKey: LITELLM_API_KEY,
	model: LITELLM_MODEL,
});

const server = createServer(
	createApp({ store, chat, allowedOrigin: ALLOWED_ORIGIN }),
);
server.listen(Number(PORT), () =>
	console.log(`pobre-lingo-api na porta ${PORT}`),
);

const shutdown = () => {
	server.close(() => store.close().finally(() => process.exit(0)));
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
