
/* eslint-disable no-restricted-globals */
self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  if (type === 'INIT') {
    (self as any).preparedEntries = payload;
    return;
  }

  if (type === 'SEARCH') {
    const { searchTerm } = payload;
    const preparedEntries = (self as any).preparedEntries || [];

    const termLower = searchTerm.toLowerCase().trim();

    if (!termLower) {
      self.postMessage({ type: 'RESULTS', payload: preparedEntries });
      return;
    }

    const filtered = preparedEntries.filter((entry: any) =>
      entry.wordLower.includes(termLower) ||
      entry.translationLower.includes(termLower)
    );

    self.postMessage({ type: 'RESULTS', payload: filtered });
  }
};
