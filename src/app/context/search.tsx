import { createContext, useContext, useState, ReactNode, FC } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchAppStateContext = createContext<SearchContextType | undefined>(undefined);
const SearchDispatchContext = createContext<((term: string) => void) | undefined>(undefined);

const GlobalSearchAppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = (term: string) => setSearchTerm(term);

  return (
    <SearchAppStateContext.Provider value={{ searchTerm, setSearchTerm }}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchAppStateContext.Provider>
  );
};

const useGlobalSearchAppState = (): SearchContextType => { //useSearch
  const context = useContext(SearchAppStateContext);
  if (!context) {
    throw new Error("useGlobalSearchAppState must be used within SearchAppStateContext");
  }
  return context;
};

const useGlobalSearchAppDispatch = (): ((term: string) => void) => {
  const context = useContext(SearchDispatchContext);
  if (!context) {
    throw new Error("useGlobalSearchAppDispatch must be used within SearchDispatchContext");
  }
  return context;
};

export { GlobalSearchAppProvider, useGlobalSearchAppState, useGlobalSearchAppDispatch };