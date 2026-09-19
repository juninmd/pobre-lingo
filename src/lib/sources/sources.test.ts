import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchNativeSentences } from "./tatoeba";
import { fetchArticle, searchArticles } from "./wikipedia";

function mockFetch(body: unknown, ok = true) {
	const fn = vi.fn(async (_url: string) => ({
		ok,
		status: ok ? 200 : 503,
		json: async () => body,
	}));
	vi.stubGlobal("fetch", fn);
	return fn;
}

afterEach(() => vi.unstubAllGlobals());

describe("tatoeba", () => {
	it("maps native audio with attribution and filters by level length", async () => {
		const fetchMock = mockFetch({
			data: [
				{
					id: 1,
					text: "How far is the airport?",
					audios: [
						{
							author: "CK",
							license: "CC BY-NC-ND 3.0",
							download_url: "https://api.tatoeba.org/v1/audio/9/file",
						},
					],
					translations: [{ lang: "por", text: "Quão longe fica o aeroporto?" }],
				},
			],
		});
		const [sentence] = await fetchNativeSentences({
			level: "A2",
			query: "airport",
		});
		expect(sentence).toMatchObject({
			text: "How far is the airport?",
			translation: "Quão longe fica o aeroporto?",
			audioAuthor: "CK",
			audioLicense: "CC BY-NC-ND 3.0",
		});
		const url = String(fetchMock.mock.calls[0]?.[0]);
		expect(url).toContain("word_count=5-8");
		expect(url).toContain("q=airport");
	});

	it("drops audio served from any other host (untrusted media source)", async () => {
		mockFetch({
			data: [
				{
					id: 2,
					text: "Hi",
					audios: [{ download_url: "https://evil.example/a.mp3" }],
				},
				{ id: 3, text: "No audio" },
			],
		});
		expect(await fetchNativeSentences({ level: "A1" })).toEqual([]);
	});

	it("reports a failed request instead of returning empty results", async () => {
		mockFetch({}, false);
		await expect(fetchNativeSentences({ level: "B1" })).rejects.toThrow("503");
	});
});

describe("wikipedia", () => {
	it("returns plain text without section headings and a safe source link", async () => {
		mockFetch({
			query: {
				pages: [
					{
						title: "Coffee",
						extract: "Coffee is a drink.\n== History ==\nIt is old.",
						fullurl: "javascript:alert(1)",
					},
				],
			},
		});
		const article = await fetchArticle("Coffee");
		expect(article.text).not.toContain("==");
		expect(article.url).toBe("https://simple.wikipedia.org/wiki/Coffee");
	});

	it("rejects empty articles and strips HTML from search snippets", async () => {
		mockFetch({ query: { pages: [{ title: "X", extract: "  " }] } });
		await expect(fetchArticle("X")).rejects.toThrow();
		mockFetch({
			query: {
				search: [
					{ title: "Coffee", snippet: '<span class="m">Coffee</span> is' },
				],
			},
		});
		expect(await searchArticles("coffee")).toEqual([
			{ title: "Coffee", snippet: "Coffee is" },
		]);
	});
});
