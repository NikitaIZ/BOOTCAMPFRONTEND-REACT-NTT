import { ClientAppActions } from "../domain/app-client";
import { Client } from "../domain/client";

export interface DispatchObjectClient<A, T = any> {
  type: A;
  payload?: T;
}

export interface ClientAppState  {
  clients: Client[];
  clientSelected: Client | null;
}

export const ClientinitialState: ClientAppState = {
  clients: [],
  clientSelected: null,
};

export const clientAppReducer = (
  state: ClientAppState,
  { type, payload }: DispatchObjectClient<ClientAppActions>
) => {
  switch (type) {
    case ClientAppActions.SaveClient:
      return {
        ...state,
        clients: [...state.clients, payload as Client],
      };
    case ClientAppActions.DeleteClient:
      return {
        ...state,
        clients: payload as Client[],
      };
    case ClientAppActions.SelectClient:
      return {
        ...state,
        clientSelected: payload as Client,
      };
    default:
      throw new Error("No hay actions disponible");
  }
};
