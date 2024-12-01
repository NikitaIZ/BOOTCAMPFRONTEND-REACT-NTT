export default () => {

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isAlphabetic = (text: string) => {
        const alphabetRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        return alphabetRegex.test(text);
    };

    const isNumeric = (text: string) => {
        const numericRegex = /^[0-9]+$/;
        return numericRegex.test(text);
    };

    return {
        isValidEmail,
        isAlphabetic,
        isNumeric
    };
};