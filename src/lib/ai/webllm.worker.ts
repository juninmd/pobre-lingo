import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// O modelo roda neste worker para não travar a interface durante a geração.
const handler = new WebWorkerMLCEngineHandler();
self.onmessage = (message: MessageEvent) => handler.onmessage(message);
