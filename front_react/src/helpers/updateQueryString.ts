export const updateQueryString = (searchParams: Record<string, string>) => {
  const query = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(searchParams)) {
    query.delete(key);
    if (value) {
      query.append(key, value);
    }
  }
  console.log(query.toString());
  window.history.replaceState(null, '', `?${query.toString()}`);
};