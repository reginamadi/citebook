import { GET_INFO,SET_CLICKED_VALUE, USER_LIST } from "../actions/types";
const INTIAL_STATE ={
    followers:null,
    papers:null,
    clicked_value:null,
    user_list:null
}
export default (state=INTIAL_STATE,action) => {
    switch(action.type){
        case GET_INFO:
            return{...state,followers:action.payload[0],papers:action.payload[1]}
        case SET_CLICKED_VALUE:
            return{...state,clicked_value:action.payload}
        case USER_LIST:
            return{...state,user_list:action.payload}
        default:
            return state;
   }
}