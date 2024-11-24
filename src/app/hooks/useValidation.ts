import { useCallback } from 'react';

export const useValidation = () => {

    const isValidEmail = useCallback((email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }, []);

    const isAlphabetic = useCallback((text: string): boolean => {
        const alphabetRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return alphabetRegex.test(text);
    }, []);

    const isNumeric = useCallback((text: string): boolean => {
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(text);
    }, []);

    return {
        isValidEmail,
        isAlphabetic,
        isNumeric
    };
};