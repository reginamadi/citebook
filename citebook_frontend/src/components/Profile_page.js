import React,{useState} from 'react'
import { useEffect } from 'react'
import { connect ,useDispatch} from 'react-redux'
import { Grid,Card,Icon,Image,Container, Segment } from 'semantic-ui-react'
import Post_List from './Post_List'
import Right_sidebar from './Right_sidebar'
import { profile_posts,get_user_profile } from '../actions'
import Profile_left_sidebar from './Profile_left_sidebar'
import user from '../apis/user'
import moment from 'moment';
import Left_sidebar from './Left_sidebar'
import history from '../history';


export const Profile_page = (props) => {
  const [picture_url, setPicture_url] = useState("");
  const [user_info, setUser_info] = useState("");
  const segment = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const dispatch = useDispatch();
    const posts= async()=>{
    const response=await dispatch(profile_posts(segment));
   }
   const info=async ()=>{
    const response2= await dispatch(get_user_profile(segment));
    setUser_info(response2[0]);
    setPicture_url(response2[0].file_path);
   }
    useEffect(()=>{
      if(!props.isSignedIn){
        history.push("/");
      }
        posts();
        info();
    },[segment])
  return (
    <Grid columns={3} divided style={{"marginRight":"0px"}}>
        <Grid.Row >
          <Grid.Column width={3} style={{"marginTop":"30px"}}>
          {user_info.id==props.userId &&
            <Left_sidebar/>
          }
          {user_info.id!=props.userId &&
          <Profile_left_sidebar
           user_id={segment}
           picture={picture_url}/>
          }
          </Grid.Column>
      <Grid.Column width={10} >
      <Segment style={{"marginTop":"30px"}}><h2 style={{"marginBottom":"5px"}} >{user_info.fname} {user_info.lname}</h2>
      <Container textAlign="left">{user_info.affiliations}</Container>
      <Card.Meta>Joined Citebook: {moment(user_info.created_at).format('DD-MMM-YYYY')}</Card.Meta>
      <h3>About {user_info.fname} </h3>
      
      
      <Container textAlign="left">{user_info.interests}</Container>
      </Segment>
      
      <h3 style={{"marginTop":"60px","marginBottom":"20px"}} >Posts</h3>  
       <Post_List/>
       
       
        
      </Grid.Column>
    <Grid.Column width={3} style={{"padding":"0px"}}> 
      <Right_sidebar/>
    </Grid.Column>
    </Grid.Row>
    </Grid>
  )
}

const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,
      userId: state.auth.userId,
      info: state.info
    };
  };
  


export default connect(mapStateToProps, {})(Profile_page)