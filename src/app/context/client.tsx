import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";
import { ClientAppDispatch } from "../domain/app-client";
import { clientAppReducer, ClientAppState, ClientinitialState } from "../reducer/client";
  
  const ClientAppStateContext = createContext<ClientAppState | undefined>(undefined);
  const ClientAppDispatchContext = createContext<ClientAppDispatch | undefined>(undefined);
  
  const GlobalClientAppProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(clientAppReducer, ClientinitialState);
  
    return (
      <ClientAppStateContext.Provider value={state}>
        <ClientAppDispatchContext.Provider value={dispatch}>
          {children}
        </ClientAppDispatchContext.Provider>
      </ClientAppStateContext.Provider>
    );
  };
  
  const useGlobalClientAppState = (): ClientAppState => {
    const context = useContext(ClientAppStateContext) as ClientAppState;
  
    if (context) {
      return context;
    }
  
    throw new Error("useGlobalClientAppState not used within ClientAppStateContext");
  };
  
  const useGlobalClientAppDispatch = (): ClientAppDispatch => {
    const context = useContext(ClientAppDispatchContext) as ClientAppDispatch;
  
    if (context) {
      return context;
    }
  
    throw new Error("useGlobalClientAppDispatch not used within ClientAppDispatchContext");
  };
  
export { GlobalClientAppProvider, useGlobalClientAppState, useGlobalClientAppDispatch };
  