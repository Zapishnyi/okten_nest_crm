import { useSearchParams } from 'react-router-dom';


export const useSearchParamsSet = <T extends Record<string, string>, >(searchParams: T) => {
  const [query, setQuery] = useSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    query.delete(key);
    if (value) {
      query.append(key, value.toString());
    }
  }
  setQuery(query);
};