import { Dispatch } from "react";
import { PaginationDispatchObject } from "../../reducer/pagination";

export type PaginationAppDispatch = Dispatch<PaginationDispatchObject<PaginationAppActions>>;

export const enum PaginationAppActions {
  PaginationCurrent = "PAGINATION_CURRENT",
  PaginationTotal = "PAGINATION_TOTAL",
  PaginationReset = "PAGINATION_RESET",
}
