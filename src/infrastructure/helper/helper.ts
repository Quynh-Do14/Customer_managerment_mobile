import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "../../core/common/constant";

export const validateFields = (isImplicitChange: boolean, key: any, isCheck: boolean, setError: Function, error: any, message: string) => {
    if (isImplicitChange) {
        error[key] = {
            isError: isCheck,
            message: message,
        };
    }
    else {
        setError({
            ...error,
            [key]: {
                isError: isCheck,
                message: message,
            }
        });
    }
};

export const convertTime = (date: any) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    return (formattedDate)
}

export const LevelConfig = (level: number) => {
    let result = "";
    if (level) {
        Constants.Level.List.map(it => {
            if (level == it.value)
                result = it.label
        })
        return result
    }
}

export const StatusConfig = (status: number) => {
    let result = "";
    if (status) {
        Constants.Status.List.map(it => {
            if (status == it.value)
                result = it.label
        })
        return result
    }

}
export const translationData = async (vi: string, en: string) => {
    const storegrage = await AsyncStorage.getItem("language");
    if (storegrage === "vi") {
        return vi;
    };
    if (storegrage === "en") {
        return en;
    };
    return vi;
}
