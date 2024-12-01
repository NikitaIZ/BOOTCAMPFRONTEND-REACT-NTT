import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../useLocalStorage';

beforeAll(() => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
});

describe('useLocalStorage hook', () => {
    it('should initialize with initial value if nothing is in localStorage', () => {
        (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(null);

        const { result } = renderHook(() => useLocalStorage('myKey', 'initialValue'));

        expect(result.current.storedValue).toBe('initialValue');
    });

    it('should initialize with value from localStorage if available', () => {
        (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify('storedValue'));

        const { result } = renderHook(() => useLocalStorage('myKey', 'initialValue'));

        expect(result.current.storedValue).toBe('storedValue');
    });

    it('should update the value in localStorage when setStoredValue is called', () => {
        (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(null);

        const { result } = renderHook(() => useLocalStorage('myKey', 'initialValue'));

        act(() => {
            result.current.setStoredValue('newValue');
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('myKey', JSON.stringify('newValue'));
        expect(result.current.storedValue).toBe('newValue');
    });

    it('should correctly update value when setStoredValue is called multiple times', () => {
        (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(null);

        const { result } = renderHook(() => useLocalStorage('myKey', 'initialValue'));

        act(() => {
            result.current.setStoredValue('newValue1');
        });
        act(() => {
            result.current.setStoredValue('newValue2');
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('myKey', JSON.stringify('newValue2'));
        expect(result.current.storedValue).toBe('newValue2');
    });

    it('should handle non-string values (e.g., objects)', () => {
        const initialValue = { name: 'John', age: 30 };
        (Storage.prototype.getItem as jest.Mock).mockReturnValueOnce(null);

        const { result } = renderHook(() => useLocalStorage('myKey', initialValue));

        expect(result.current.storedValue).toEqual(initialValue);

        act(() => {
            result.current.setStoredValue({ name: 'Alice', age: 25 });
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('myKey', JSON.stringify({ name: 'Alice', age: 25 }));
        expect(result.current.storedValue).toEqual({ name: 'Alice', age: 25 });
    });
});
