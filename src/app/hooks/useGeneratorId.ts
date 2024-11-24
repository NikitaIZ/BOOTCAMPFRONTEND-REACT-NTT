import { useCallback } from 'react';

export const useGeneratorId = () => {
    const generateUniqueId = useCallback((): string => {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomString}`;
    }, []);

    return {
        generateUniqueId,
    };
};
