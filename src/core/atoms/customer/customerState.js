import { atom } from "recoil";

export const CustomerState = atom({
    key: 'CUSTOMER_STATE',
    default: {
        // isLoading: false,
        // uri: '',
        data: {
            name: "",
            level: 0,
            coins: "",
        }
    },
});