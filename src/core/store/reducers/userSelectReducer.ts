import { useReducer } from 'react';
import { USER_SELECT } from '../../common/reducer';

const initialState: any = "";
const userSelectReducer = (state = initialState, action: { type: any; userSelect: any }) => {

    switch (action.type) {
        case USER_SELECT:
            return {
                ...state,
                userSelect: action.userSelect,
            };
        default:
            return state;
    }
};

export default userSelectReducer;
