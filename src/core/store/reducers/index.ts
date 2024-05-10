import { combineReducers } from "redux";
import listCheckReducer from "./listCheckReducer";

const rootReducer = combineReducers({
    listCheckReducer,
})
export default rootReducer;