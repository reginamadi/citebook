import { CREATE_POST,FEED_POST,LIKE_POST,VIEW_POST ,RANDOM_POST } from "../actions/types";
const INTIAL_STATE ={
    posts_created:null,
    new_posts:[],
    random_posts:[]
}

export default (state=INTIAL_STATE,action) => {
    switch(action.type){
        case CREATE_POST:
            return{...state,posts_created:action.payload};
        case FEED_POST:
            return{...state,new_posts:action.payload};
        case RANDOM_POST:
            return{...state,random_posts:action.payload};
        case LIKE_POST || VIEW_POST:
            return{...state,posts_created:1}
        default:
            return state;
    }
};