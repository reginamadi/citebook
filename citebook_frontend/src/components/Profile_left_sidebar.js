import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Label, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { get_Info,click_left_sidebar,get_user_profile } from '../actions';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import history from '../history';

export const Profile_left_sidebar = (props) => {
   
    const dispatch = useDispatch();
    const [activeItem, setActiveItem] = useState("");
    const handleItemClick = async (e,{name}) =>{
      setActiveItem(name);
    
    //  await dispatch(click_left_sidebar(name));
   //   history.push(`/citebook/${name}`);
    }
    
    const get_info = async () =>{
      const response=(await dispatch(get_Info(props.user_id)));
     // await dispatch(click_left_sidebar(null));
    }
    useEffect(()=>{
       get_info();
      },[]);
      
  
      return (
        
        <Menu vertical size='large' 
        style={{"marginRight":"10px ","marginLeft":"15px"}}
        >
          <Link to="/" className='item' >
                <img alt="" style={{"width":"100%"}} src={`http://localhost:8000/${props.picture}`}/>
              </Link>
          <Menu.Item
            name='followers'
            active={activeItem === 'followers'}
            onClick={handleItemClick}
          >
            <Label color='teal'>{props.info.followers}</Label>
            Followers
          </Menu.Item>
  
          <Menu.Item
            name='papers'
            active={activeItem === 'papers'}
           onClick={handleItemClick}
          >
  
            <Label>{props.info.papers}</Label>
            Papers
          </Menu.Item>

          
          
          
        </Menu>
      )
  }
  const mapStateToProps = (state,ownprops) => {
    return {
      userId: state.auth.userId,
      info: state.info,
      posts: state.post.new_posts
    };
  };
  export default connect(mapStateToProps,{get_Info,click_left_sidebar})(Profile_left_sidebar)