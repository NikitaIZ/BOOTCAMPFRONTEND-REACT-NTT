import { renderHook } from '@testing-library/react-hooks';
import { useDistricts } from '../useDistricts';
import { districtsResponseMock } from '../__mocks__/districts';

global.fetch = jest.fn();

describe('useDistricts hook', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load districts correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => districtsResponseMock[0],
        });

        const { result, waitForNextUpdate } = renderHook(() => useDistricts());

        await waitForNextUpdate();

        expect(result.current.districts).toEqual(districtsResponseMock[0].districts);
    });

    it('should handle error when fetch response is not ok', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            statusText: 'Not Found',
        });

        const { result, waitForNextUpdate } = renderHook(() => useDistricts());

        await waitForNextUpdate();

        expect(result.current.districts).toEqual([]);
    });

    it('should handle fetch failure correctly', async () => {
        (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        const { result, waitForNextUpdate } = renderHook(() => useDistricts());

        await waitForNextUpdate();

        expect(result.current.districts).toEqual([]);
    });
});
