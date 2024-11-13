import React,{useState} from 'react'
import { connect, useDispatch } from "react-redux";
import Post from './Post';
import {  Placeholder, Segment } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';

export const  Post_List = (props) =>{

//an ta posts en null na efanizounte placeholders
  return (
    <div>
    
    {props.post_list.length>0 &&
      props.post_list.map((post) =>(
       
        <Post
        key={post.id}
        post_prop={post}
        />

      ))}
      {(props.post_list.length===0) &&
       
     <div >
    
         <h2 style={{"position":"absolute",'left':"45%","marginTop":"10%"}}>No posts yet</h2>
</div>

      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    post_list: state.post.new_posts
  };
};


export default connect(mapStateToProps,{})( Post_List)