import * as types from '../../common/reducer'

export const userSelect = (data: string) => {
    console.log("data", data);

    return {
        type: types.USER_SELECT,
        userSelect: data,
    };
};
