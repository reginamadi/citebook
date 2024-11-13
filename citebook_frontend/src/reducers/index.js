import { combineReducers } from "redux";

import authReducer from "./authReducer";
import infoReducer from "./infoReducer";
import postReducer from "./postReducer";
import remembermeReducer from "./remembermeReducer";
export default combineReducers({
    auth: authReducer,
    post: postReducer,
    info: infoReducer,
    rememberme: remembermeReducer,
});