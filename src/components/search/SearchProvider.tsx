import React, { createContext, useContext } from "react";
import { useSearch } from "@/hooks/useSearch";

const SearchContext = createContext<ReturnType<typeof useSearch> | undefined>(undefined);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const search = useSearch();
  return <SearchContext.Provider value={search}>{children}</SearchContext.Provider>;
};
