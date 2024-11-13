import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Button, Card, Image } from 'semantic-ui-react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { get_picture_url,get_Info_follow,follow_User,Unfollow_User,get_usernames} from '../actions'
import moment from 'moment';
import { Link } from 'react-router-dom'

export const User_to_follow = (props) => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState();
    const follow_user= async()=>{
      let formValues={
        user_id: props.user_id,
        follow_id:props.user.id
      }
      const response=await dispatch(follow_User(formValues));
      const response2=(await dispatch(get_usernames(props.user_id)));
    }
    const unfollow_user= async()=>{
      let formValues={
        user_id: props.user_id,
        follow_id:props.user.id
      }
      const response=await dispatch(Unfollow_User(formValues));
      const response2=(await dispatch(get_usernames(props.user_id)));
    }
    const get_info= async()=>{
        const response2=await dispatch(get_Info_follow(props.user.id));
        setInfo(response2);
      }
    useEffect(()=>{
        get_info();
    },[props.user]);
  return (
    <Card.Group>
    <Card>
      <Card.Content>
      <Image avatar
          floated='right'
          size='massive'
          src={`http://localhost:8000/${props.user.file_path}`}
        />
      <Link to={`/citebook/profile/${props.user.id}`}>  <Card.Header>{props.user.fname} {props.user.lname}</Card.Header></Link>
        <Card.Meta>Joined: {moment(props.user.created_at).format('DD-MMM-YYYY')}</Card.Meta>
        <Card.Meta>Followers: {info && info[0]}</Card.Meta>
        <Card.Meta>Papers: {info && info[1]}</Card.Meta>
        
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          {!props.user.follow &&
          <Button basic color='green' onClick={follow_user}>
            Follow
          </Button>
          }
           {props.user.follow &&
          <Button basic color='red' onClick={unfollow_user}>
            Unfollow
          </Button>
          }
        </div>
      </Card.Content>
    </Card>
    </Card.Group>
  )
}

const mapStateToProps = (state) => ({
  user_id:state.auth.userId,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(User_to_follow)