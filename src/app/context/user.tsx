import { createContext, FC, PropsWithChildren, useContext, useEffect, useReducer } from "react";
import { UserAppDispatch } from "../domain/types/app-user";
import { userAppReducer, UserAppState, userInitialState } from "../reducer/user";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserAppStateContext = createContext<UserAppState | undefined>(undefined);
const UserAppDispatchContext = createContext<UserAppDispatch | undefined>(undefined);

const GlobalUserAppProvider: FC<PropsWithChildren> = ({ children }) => {
    const { storedValue, setStoredValue } = useLocalStorage<UserAppState>("login", userInitialState);
    const [state, dispatch] = useReducer(userAppReducer, storedValue);

    useEffect(() => {
        setStoredValue(state);
    }, [state, setStoredValue]);

    return (
        <UserAppStateContext.Provider value={state}>
            <UserAppDispatchContext.Provider value={dispatch}>
                {children}
            </UserAppDispatchContext.Provider>
        </UserAppStateContext.Provider>
    );
};

const useGlobalUserAppState = (): UserAppState => {
    const context = useContext(UserAppStateContext);
    if (!context) {
        throw new Error("useGlobalUserAppState must be used within UserAppStateContext");
    }
    return context;
};

const useGlobalUserAppDispatch = (): UserAppDispatch => {
    const context = useContext(UserAppDispatchContext);
    if (!context) {
        throw new Error("useGlobalUserAppDispatch must be used within UserAppDispatchContext");
    }
    return context;
};

export { GlobalUserAppProvider, useGlobalUserAppState, useGlobalUserAppDispatch };
