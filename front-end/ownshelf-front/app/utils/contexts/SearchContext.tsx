import { useState, createContext } from "react";


interface SearchContextType {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchContext = createContext<SearchContextType>(null!);

export function SearchProvider({ children }: any) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}