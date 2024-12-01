import { Client } from "../domain/interfaces/client";
import { ClientAppActions } from "../domain/types/app-client";

export interface ClientDispatchObject<A, T = unknown> {
  type: A;
  payload?: T;
}

export interface ClientAppState {
  clients: Client[];
  clientSelected: Client | null;
}

export const clientInitialState: ClientAppState = {
  clients: [],
  clientSelected: null,
};

export const clientAppReducer = (
  state: ClientAppState,
  { type, payload }: ClientDispatchObject<ClientAppActions>
) => {
  switch (type) {
    case ClientAppActions.ClientSave:
      return {
        ...state,
        clients: [...state.clients, payload as Client],
      };
    case ClientAppActions.ClientDelete:
      return {
        ...state,
        clients: payload as Client[],
      };
    case ClientAppActions.ClientSelect:
      return {
        ...state,
        clientSelected: payload as Client,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
