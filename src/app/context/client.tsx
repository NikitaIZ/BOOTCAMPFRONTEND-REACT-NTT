import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";
import { ClientAppDispatch } from "../domain/app-client";
import { clientAppReducer, ClientAppState, clientInitialState } from "../reducer/client";

const ClientAppStateContext = createContext<ClientAppState | undefined>(undefined);
const ClientAppDispatchContext = createContext<ClientAppDispatch | undefined>(undefined);

const GlobalClientAppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(clientAppReducer, clientInitialState);

  return (
    <ClientAppStateContext.Provider value={state}>
      <ClientAppDispatchContext.Provider value={dispatch}>
        {children}
      </ClientAppDispatchContext.Provider>
    </ClientAppStateContext.Provider>
  );
};

const useGlobalClientAppState = (): ClientAppState => {
  const context = useContext(ClientAppStateContext);
  if (!context) {
    throw new Error("useGlobalClientAppState debe usarse dentro de un ClientAppStateContext");
  }
  return context;
};

const useGlobalClientAppDispatch = (): ClientAppDispatch => {
  const context = useContext(ClientAppDispatchContext);
  if (!context) {
    throw new Error("useGlobalClientAppDispatch debe usarse dentro de un ClientAppDispatchContext");
  }
  return context;
};

export { GlobalClientAppProvider, useGlobalClientAppState, useGlobalClientAppDispatch };
