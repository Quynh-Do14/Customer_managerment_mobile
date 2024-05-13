import { atom } from "recoil";

export const LanguageState = atom({
    key: 'LANGUAGE_STATE',
    default: {
        // isLoading: false,
        // uri: '',
        language: ""
    },
});