import { emailRegex, alphabetRegex, numericRegex } from "../helper";
export default () => {

    const isValidEmail = (email: string) => {
        return emailRegex.test(email);
    };

    const isAlphabetic = (text: string) => {
        return alphabetRegex.test(text);
    };

    const isNumeric = (text: string) => {
        return numericRegex.test(text);
    };

    return {
        isValidEmail,
        isAlphabetic,
        isNumeric
    };
};