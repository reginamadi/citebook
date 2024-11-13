import React,{useState} from 'react';
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Image, Message, Segment,Checkbox } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { reset_pass2 } from '../actions';
import history from '../history';
import Swal from 'sweetalert2';

export const Reset_pass_step2 = (props) => {
    const[password,setPassword] = useState("");
    const[confirmpass,setConfirmPass]=useState("");
    const[error,setErrors]=useState(false);
    const dispatch = useDispatch();

    const resetpass=async()=>{
     if(password!=confirmpass){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Passwords dont match`,
          })
     }
        let formvalues={
          password,
          confirmpass,
          token:props.match.params.token
        }
        const response=await dispatch(reset_pass2(formvalues));
        if (response=="success"){
            history.push('/login');
        }
    }
    return (
    
    <div id="back">
    <img alt="" style={{"width":"100%","position":"absolute"}} src="http://localhost:8000/posts_pdf/bookswall.jpg"/>
 <Grid textAlign='center' container columns={1} style={{margin:0}} verticalAlign='middle' >     
 <Grid.Column style={{ maxWidth: 450 ,top:300}}>
<Header as='h2' block color='teal' textAlign='center'>
     <Image src="http://localhost:8000/posts_pdf/logo.png" /> Reset your password
   </Header>
   <Form  size='large'>
     <Segment stacked>
       <Form.Input 
       required={true}
       error={error}
       fluid icon='lock' 
       iconPosition='left' 
       type='password'
       placeholder='Password' 
       value={password}
       onChange={(e)=>setPassword(e.target.value)}
       />
    <Form.Input 
       required={true}
       error={error}
       fluid icon='lock' 
       iconPosition='left' 
       type='password'
       placeholder='Confirm Password' 
       value={confirmpass}
       onChange={(e)=>setConfirmPass(e.target.value)}
       />
       
      <Button 
       fluid
       onClick={resetpass}
         color='teal' 
          size='large'
         type="submit"
        >Submit
       </Button>
    
     </Segment>
   </Form>

   <Message>
     New to us? <a href='/register'>Sign Up</a>
   </Message>
 </Grid.Column>

</Grid>
</div>

 );
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {})(Reset_pass_step2)