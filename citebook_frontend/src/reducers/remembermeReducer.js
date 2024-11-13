import { REMEMBER_ME,FORGET_ME} from "../actions/types";
const INTIAL_STATE ={
    email:null,
    password:null,
    flag:null
}
export default (state=INTIAL_STATE,action) => {
    switch(action.type){
        case REMEMBER_ME:
            return{...state,email:action.payload.email,password:action.payload.password,flag:true}
        case FORGET_ME:
            return{...state,email:null,password:null,flag:false}
        default:
            return state;
   }
}