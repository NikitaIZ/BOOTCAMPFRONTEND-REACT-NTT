import { PaginationAppActions } from "../domain/app-pagination";
import { Paginations } from "../domain/paginations";

export interface PaginationDispatchObject<A, T = unknown> {
    type: A;
    payload?: T;
}
export interface PaginationAppState {
  paginations: Paginations; 
}

export const paginationInitialState: PaginationAppState = {
  paginations: {
    currentPage: 1,
    totalPages: 1,
  },
};

export const paginationAppReducer = (
  state: PaginationAppState,
  { type, payload }: PaginationDispatchObject<PaginationAppActions>
): PaginationAppState => {
  switch (type) {
    case PaginationAppActions.PaginationCurrent:
      return { 
        ...state, 
        paginations: { 
          ...state.paginations, 
          currentPage: payload as number 
        }
      };
    case PaginationAppActions.PaginationTotal:
      return { 
        ...state, 
        paginations: { 
          ...state.paginations, 
          totalPages: payload as number 
        }
      };
    case PaginationAppActions.PaginationReset:
      return { 
        ...state, 
        paginations: { 
          ...state.paginations, 
          currentPage: 1 
        }
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
