import { Dispatch } from "react";
import { ClientDispatchObject } from "../../reducer/client";

export type ClientAppDispatch = Dispatch<ClientDispatchObject<ClientAppActions>>;

export const enum ClientAppActions {
  ClientSave = "CLIENT_SAVE",
  ClientSelect = "CLIENT_SELECT",
  ClientDelete = "CLIENT_DELETE",
}
