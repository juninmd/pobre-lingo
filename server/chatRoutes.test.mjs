// @vitest-environment node
import { describe, expect, it } from "vitest";
import { clientAddress } from "./chatRoutes.mjs";

const req = (xff, remote = "10.0.0.1") => ({
	headers: xff === undefined ? {} : { "x-forwarded-for": xff },
	socket: { remoteAddress: remote },
});

describe("clientAddress", () => {
	it("usa o IP que o proxy confiável acrescentou, não o que o cliente escreveu", () => {
		expect(clientAddress(req("1.2.3.4, 203.0.113.9"))).toBe("203.0.113.9");
		expect(clientAddress(req("203.0.113.9"))).toBe("203.0.113.9");
	});

	it("respeita a quantidade de proxies confiáveis", () => {
		expect(clientAddress(req("spoof, 203.0.113.9, 10.1.1.1"), 2)).toBe(
			"203.0.113.9",
		);
	});

	it("sem cabeçalho (ou com menos saltos que o esperado) cai no endereço do socket", () => {
		expect(clientAddress(req(undefined))).toBe("10.0.0.1");
		expect(clientAddress(req("203.0.113.9"), 2)).toBe("10.0.0.1");
	});
});
