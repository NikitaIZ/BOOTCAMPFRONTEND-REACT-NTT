import { useCallback } from 'react';

export const useValidation = () => {

    const isValidEmail = useCallback((email: string): boolean => {
        // este regex deber'ia estar en otro archivo para centralizarlo y posiblemente reutilizarlo en otra situaci'on
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const isAlphabetic = useCallback((text: string): boolean => {
        // este regex deber'ia estar en otro archivo para centralizarlo y posiblemente reutilizarlo en otra situaci'on
        const alphabetRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return alphabetRegex.test(text);
    }, []);

    const isNumeric = useCallback((text: string): boolean => {
        // este regex deber'ia estar en otro archivo para centralizarlo y posiblemente reutilizarlo en otra situaci'on
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(text);
    }, []);

    return {
        isValidEmail,
        isAlphabetic,
        isNumeric
    };
};