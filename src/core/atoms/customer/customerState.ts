import { atom } from "recoil";

export const CustomerState = atom({
    key: 'CUSTOMER_STATE',
    default: {
        // isLoading: false,
        // uri: '',
        data: {
            id: 0,
            name: "",
            level: 0,
            address: "",
            phone: "",
            cccd: "",
        }
    },
});