import { paginationAppReducer, paginationInitialState } from '../pagination';
import { PaginationAppActions } from "@/app/domain/types/app-pagination";

describe('paginationAppReducer', () => {
    it('should handle PaginationCurrent action and set the current page', () => {
        const action = {
            type: PaginationAppActions.PaginationCurrent,
            payload: 3,
        };

        const stateAfterAction = paginationAppReducer(paginationInitialState, action);

        expect(stateAfterAction.paginations.currentPage).toBe(3);
    });

    it('should handle PaginationTotal action and set the total pages', () => {
        const action = {
            type: PaginationAppActions.PaginationTotal,
            payload: 10,
        };

        const stateAfterAction = paginationAppReducer(paginationInitialState, action);

        expect(stateAfterAction.paginations.totalPages).toBe(10);
    });

    it('should handle PaginationReset action and reset the current page to 1', () => {
        const action = {
            type: PaginationAppActions.PaginationReset,
        };

        const stateAfterAction = paginationAppReducer({
            paginations: { currentPage: 5, totalPages: 10 }, 
        }, action);

        expect(stateAfterAction.paginations.currentPage).toBe(1);
    });

    it('should throw an error if the action type is not handled', () => {
        const action = {
            type: 'UNKNOWN_ACTION', 
        };

        expect(() => paginationAppReducer(paginationInitialState, action as any)).toThrowError('Unhandled action type: UNKNOWN_ACTION');
    });
});
