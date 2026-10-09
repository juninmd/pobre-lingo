/** Seam for tests: jsdom does not allow stubbing `location.reload`. */
export const reloadPage = () => window.location.reload();
