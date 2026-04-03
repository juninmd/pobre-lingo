


// Explicitly type the global context as any to avoid TS errors without webworker lib
const ctx: any = self;

ctx.onmessage = (event: any) => {
  const { type, payload } = event.data;

  if (type === 'INIT') {
    ctx.preparedEntries = payload;
  } else if (type === 'SEARCH') {
    const { searchTerm } = payload;
    const entries = ctx.preparedEntries || [];
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      ctx.postMessage({ type: 'RESULTS', payload: entries });
    } else {
      const filtered = entries.filter((entry: any) =>
        entry.wordLower.includes(term) ||
        entry.translationLower.includes(term)
      );
      ctx.postMessage({ type: 'RESULTS', payload: filtered });
    }
  }
};

export {};
