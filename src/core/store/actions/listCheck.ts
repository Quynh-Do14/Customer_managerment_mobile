import * as types from '../../common/reducer'

export const listCheck = (data: Array<any>) => {
    console.log("data", data);
    return {
        type: types.LIST_CHECK,
        listCheck: data,
    };
};
