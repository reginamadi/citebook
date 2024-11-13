import React,{useState} from 'react'
import { connect,useDispatch } from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
import { useEffect } from 'react'
import { get_usernames } from '../actions'
import User_to_follow from './User_to_follow'
import Search_Bar from './Search_Bar'
import './css/Users_list.css';
import Search_Users from './Search_Users'

export const Users_to_follow = (props) => {
  const dispatch = useDispatch();
  const [usernames, setUsernames] = useState();
 
  const get_users= async() =>{
    const response=(await dispatch(get_usernames(props.userId)));
    setUsernames(response);
 // response.map((re)  => setDate(moment(re.created_at).format('DD-MMM-YYYY')));
}


  useEffect(()=>{
    get_users();
    
},[]);

  return (
    <div style={{"marginTop":"40px"}}>
      <div className='search_bar'>
        {props.users_list &&
        <div>
   
      
      <Search_Users
          users={props.users_list}
        />
 
        </div>}
      </div>
      <Card>
    <Card.Content>
      <Card.Header>Users</Card.Header>
    </Card.Content>
     </Card>
   {props.users_list &&
      props.users_list.sort(() => Math.random() - Math.random()).slice(0,2).map((user,index) =>(
       
        <User_to_follow
        key={index}
        user={user}
        />


  
     ))}
     
</div>
   

   
  )
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    post_list: state.post.new_posts,
    users_list: state.info.user_list
  };
};


export default connect(mapStateToProps, {})(Users_to_follow)