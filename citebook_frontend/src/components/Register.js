import { Button, Form, Grid, Header, Icon, Image, Message, Segment } from 'semantic-ui-react';
import React,{useState} from 'react';
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { signIn,signOut,register_ac } from '../actions';
import user from '../apis/user';
import history from '../history';
import { useEffect } from 'react';

const Register = (props) =>{
    const dispatch = useDispatch();
    const[email,setEmail] = useState("");
    const[password,setPassword]=useState("");
    const[first_name,setfirst_name]=useState("");
    const[last_name,setlast_name]=useState("");
    const[interests,setInterests]=useState("");
  //  const[error,setError]=useState();
    let error=false;
    useEffect(()=>{
      if(props.isSignedIn){
        props.info.clicked_value="citebook";
        history.push("/citebook");
      }
    });
    const register_dispatch = (formValues3)=>{
      dispatch(register_ac(formValues3));
    }
    const validate_check= () => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const  check= re.test(email);
      if(check){
        error=false;
        RegisterClick();
      }
      else {
        error=true;
      }
   
   
    }
    const RegisterClick = async () =>{ //get request to check validation je meta dispatch sign in
      let formValues={
        fname:first_name,
        lname:last_name,
        email,
        password,
        interests};
        if(error===false){
        const response= await dispatch(register_ac(formValues));
        /*  if(!response){
            props.info.clicked_value="citebook";
            history.push("/citebook");
          }*/
        }    
       }
       
    return(
        <div>
        <img alt="" style={{"width":"100%","position":"absolute"}} src="http://localhost:8000/posts_pdf/bookswall.jpg"/>
    <Grid textAlign='center' container columns={1} style={{margin:0}} verticalAlign='middle' >     
    <Grid.Column style={{ maxWidth: 450 ,top:300}}>
      <Header as='h2' block color='teal' textAlign='center'>
        <Image src="http://localhost:8000/posts_pdf/logo.png" /> Register your account 
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input 
          required={true}
          fluid icon='mail' 
          iconPosition='left' 
          placeholder='E-mail address'
          type='email' 
          value={email}
          error={error}
          onChange={(e)=>setEmail(e.target.value)}
          />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            value={password}
           
            onChange={(e)=>setPassword(e.target.value)}
          />
           <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            placeholder='First Name'
            type='first_name'
            value={first_name}
            onChange={(e)=>setfirst_name(e.target.value)}
          />
          <Form.Input
            fluid
            icon='user' 
            iconPosition='left'
            placeholder='Last Name'
            type='last_name'
            value={last_name}
            onChange={(e)=>setlast_name(e.target.value)}
          />
          <Form.TextArea
            placeholder="About You"
            type='interests'
            value={interests}
            onChange={(e)=>setInterests(e.target.value)}
          />
         <Button 
          onClick={validate_check}
            color='teal' 
            fluid size='large'
            type="submit"
           >
            Register
          </Button>
        </Segment>
      </Form>
      <Message>
        Already have an account? <a href='/login'>Sign In</a>
      </Message>
      
    </Grid.Column>
  
  </Grid>
  </div>
    );
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    info: state.info,
  };
};
  export default connect(mapStateToProps,{register_ac})(Register);