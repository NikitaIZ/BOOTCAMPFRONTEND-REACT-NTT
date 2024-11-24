import { Dispatch } from "react";
import { DispatchObjectClient } from "../reducer/client";

export type ClientAppDispatch = Dispatch<DispatchObjectClient<ClientAppActions>>;

export const enum ClientAppActions {
  SaveClient = "SAVE_CLIENT",
  SelectClient = "SELECT_CLIENT",
  DeleteClient = "DELETE_CLIENT",
}
