import { atom } from "recoil";

export const ConstractState = atom({
    key: 'CONSTRACT_STATE',
    default: {
        // isLoading: false,
        // uri: '',
        data: {
            id: 0,
            name: "",
            customer: "",
            date: "",
            price: "",
            policy: ""
        }
    },
});