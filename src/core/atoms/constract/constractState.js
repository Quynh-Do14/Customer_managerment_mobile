import { atom } from "recoil";

export const ConstractState = atom({
    key: 'CONSTRACT_STATE',
    default: {
        // isLoading: false,
        // uri: '',
        data: {
            name: "",
            customer: "",
            date: "",
            level: "",
            price: "",
            status: 0
        }
    },
});