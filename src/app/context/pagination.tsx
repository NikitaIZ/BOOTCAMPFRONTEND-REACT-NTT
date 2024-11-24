import { createContext, FC, PropsWithChildren, useReducer, useContext } from "react";
import { paginationAppReducer, paginationInitialState } from "../reducer/pagination";
import { PaginationAppDispatch } from "../domain/app-pagination";
import { Paginations } from "../domain/paginations";

const PaginationAppStateContext = createContext<Paginations | undefined>(undefined);
const PaginationAppDispatchContext = createContext<PaginationAppDispatch | undefined>(undefined);

const GlobalPaginationAppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(paginationAppReducer, paginationInitialState);

  return (
    <PaginationAppStateContext.Provider value={state.paginations}>
      <PaginationAppDispatchContext.Provider value={dispatch}>
        {children}
      </PaginationAppDispatchContext.Provider>
    </PaginationAppStateContext.Provider>
  );
};

const useGlobalPaginationAppState = (): Paginations => {
  const context = useContext(PaginationAppStateContext);
  if (!context) {
    throw new Error("useGlobalPaginationAppState must be used within a PaginationAppStateContext");
  }
  return context;
};

const useGlobalPaginationAppDispatch = (): PaginationAppDispatch => {
  const context = useContext(PaginationAppDispatchContext);
  if (!context) {
    throw new Error("useGlobalPaginationAppDispatch must be used within a PaginationAppDispatchContext");
  }
  return context;
};

export { GlobalPaginationAppProvider, useGlobalPaginationAppState, useGlobalPaginationAppDispatch };
