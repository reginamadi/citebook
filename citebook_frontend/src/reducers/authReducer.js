import { EDIT_ACCOUNT, REGISTER, SIGN_IN,SIGN_OUT,UPLOAD_PROFILE } from "../actions/types";
const INTIAL_STATE ={
    isSignedIn: null,
    userId : null,
    userEmail:null,
    fname: null,
    lname:null,
    interests:null,
    file_path:"null",
    created_at:null,
    rememberme:null,
};

export default (state=INTIAL_STATE,action) => {
    switch(action.type){
        case SIGN_IN:
            return {...state,isSignedIn:true,
                            rememberme:action.payload.rememberpass,
                            userId: action.payload.id,
                            userEmail:action.payload.email,
                            fname:action.payload.fname,
                            lname:action.payload.lname,
                            interests:action.payload.interests,
                            file_path:action.payload.file_path,
                            created_at:action.payload.created_at,
                            affiliations:action.payload.affiliations
                            };
        case SIGN_OUT:
            return {...state,isSignedIn:false,userId:null,userEmail:null,fname:null,lname:null};
        case REGISTER:
            return {...state,
                isSignedIn:false,
                userId:action.payload.id,
                userEmail:action.payload.email,
                fname:action.payload.fname,
                lname:action.payload.lname,
                interests:action.payload.interests,
                file_path:"posts_pdf/profile_pic.jpg",
                created_at:action.payload.created_at};
        case UPLOAD_PROFILE:
            return {...state,file_path:action.payload};
        case EDIT_ACCOUNT:
            return {...state,
                            fname:action.payload.fname,
                            lname:action.payload.lname,
                            interests:action.payload.interests,
                            affiliations:action.payload.affiliations}
        default:
            return state;
    }
};