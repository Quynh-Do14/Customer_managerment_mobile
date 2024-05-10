import { useReducer } from 'react';
import { LIST_CHECK } from '../../common/reducer';

const initialState: Array<any> = [];
const listCheckReducer = (state = initialState, action: { type: any; listCheck: Array<any> }) => {

    switch (action.type) {
        case LIST_CHECK:
            return {
                ...state,
                listCheck: action.listCheck,
            };
        default:
            return state;
    }
};

export default listCheckReducer;
