import { renderHook } from '@testing-library/react-hooks';
import useValidation from '../useValidation';

describe('useValidation hook', () => {

    it('should validate email correctly', () => {
        const { result } = renderHook(() => useValidation());

        expect(result.current.isValidEmail('uwuGokusempai@gmail.com')).toBe(true);
        expect(result.current.isValidEmail('Luci.Fernanda@domain.co')).toBe(true);

        expect(result.current.isValidEmail('Gokuuuuu')).toBe(false);
        expect(result.current.isValidEmail('hollow@knight')).toBe(false);
        expect(result.current.isValidEmail('@universo.com')).toBe(false);
    });

    it('should validate alphabetic text correctly', () => {
        const { result } = renderHook(() => useValidation());

        expect(result.current.isAlphabetic('Naruto Uzumaki')).toBe(true);
        expect(result.current.isAlphabetic('Stephen Vincent Strange')).toBe(true);

        expect(result.current.isAlphabetic('Vegeta777')).toBe(false);
        expect(result.current.isAlphabetic('159')).toBe(false);
        expect(result.current.isAlphabetic('Komi@San')).toBe(false);
        expect(result.current.isAlphabetic('')).toBe(false);
    });

    it('should validate numeric text correctly', () => {
        const { result } = renderHook(() => useValidation());

        expect(result.current.isNumeric('123456')).toBe(true);
        expect(result.current.isNumeric('0')).toBe(true);

        expect(result.current.isNumeric('123Abc')).toBe(false);
        expect(result.current.isNumeric('DEA')).toBe(false);
        expect(result.current.isNumeric('123.45')).toBe(false);
        expect(result.current.isNumeric('')).toBe(false);
    });

});
