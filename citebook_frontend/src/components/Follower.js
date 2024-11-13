import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux'
import { Grid,Card,Icon,Image,Container} from 'semantic-ui-react'
import moment from 'moment';
import {Link} from 'react-router-dom';

export const Follower = (props) => {
    const [date, setDate] = useState();
    useEffect(()=>{
        setDate(moment(props.follower.created_at).format('DD-MMM-YYYY'));
    },[])
  return (

   <Grid.Column width={4}>
    <Card >
    <Image src={`http://localhost:8000/${props.follower.file_path}`} style={{"height":"200px"}} ui={false} />
    <Card.Content >
   
      <Card.Header> <Link to={`/citebook/profile/${props.follower.id}`}><Container  textAlign="left">{props.follower.fname}</Container></Link></Card.Header>
      <Card.Meta>
        <span className='date'>Joined in {date}</span>
      </Card.Meta>
      
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        {props.info.user_list.map((user)=>{
            if(user.id==props.follower.id){
                return user.follow
            }
        }) 
        } followers
      </a>
    </Card.Content>
  </Card>
  </Grid.Column>

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
  

export default connect(mapStateToProps, {})(Follower)