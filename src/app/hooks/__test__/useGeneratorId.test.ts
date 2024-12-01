import { renderHook } from '@testing-library/react-hooks';
import { useGeneratorId } from '../useGeneratorId';

describe('useGeneratorId', () => {
    it('should generate a unique id', () => {
        const { result } = renderHook(() => useGeneratorId());

        const id1 = result.current.generateUniqueId();
        const id2 = result.current.generateUniqueId();

        expect(id1).not.toBe(id2);
    });
});
