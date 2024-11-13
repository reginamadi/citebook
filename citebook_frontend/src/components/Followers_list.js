import React, { useEffect,useState } from 'react'
import { connect,useDispatch } from 'react-redux'
import { Grid,Card,Icon,Image } from 'semantic-ui-react'
import Left_sidebar from './Left_sidebar'
import Right_sidebar from './Right_sidebar'
import { get_followers } from '../actions'
import Follower from './Follower'
import Row from 'react-bootstrap/esm/Row'
import Header from './Header'

export const Followers_list = (props) => {
  const dispatch = useDispatch();
  const [followers, setFollowers] = useState();
  const get_follow_list= async()=>{
   const response=(await dispatch(get_followers(props.userId)));
    setFollowers(response);
  }
    useEffect(()=>{
      get_follow_list();
    },[props.info.clicked_value])
  return (
   <div>
      <h3  style={{"marginTop":"30px"}}>Followers</h3>
        <Grid columns={3} >
        
        {followers && followers.map((follower,index) =>(
          <Follower
          key={index}
          follower={follower}
          />
         ))}
       
         </Grid>
         </div>
  )
}

const mapStateToProps = (state) => {
    return {
      picture:state.auth.file_path,
      isSignedIn: state.auth.isSignedIn,
      userId: state.auth.userId,
      info: state.info
    };
  };
  



export default connect(mapStateToProps, {})(Followers_list)