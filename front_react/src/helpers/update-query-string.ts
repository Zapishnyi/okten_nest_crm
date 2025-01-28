export const updateQueryString = (searchParams: Record<string, string>) => {
  const query = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(searchParams)) {
    query.delete(key);
    if (value) {
      query.append(key, value);
    }
  }
    window.history.replaceState(null, '', `?${query.toString()}`);
};