import React,{useState} from 'react';
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Image, Message, Segment,Checkbox } from 'semantic-ui-react';
import { useDispatch } from "react-redux";
import { reset_pass } from '../actions';
export const Reset_pass = (props) => {
    const[email,setEmail] = useState("");
    const[error,setErrors]=useState(false);
    const dispatch = useDispatch();

    const resetpass=async()=>{
        let formvalues={
          email
        }
        const response=await dispatch(reset_pass(formvalues));
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
       fluid icon='user' 
       iconPosition='left' 
       placeholder='E-mail address' 
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
       />
 
       
      <Button 
       fluid
       onClick={resetpass}
         color='teal' 
          size='large'
         type="submit"
        >
         Submit
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


export default connect(mapStateToProps, {})(Reset_pass)