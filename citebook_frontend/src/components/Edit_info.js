import React,{useState} from 'react'
import { connect } from 'react-redux'
import { useDispatch } from "react-redux";
import { upload_Picture,edit_acc_info,change_password, google_scholar_get, add_post_scholar } from '../actions';
import Import_GS from './Import_GS';
import Swal from 'sweetalert2';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Segment,
    TextArea,
    Icon,
    Header
  } from 'semantic-ui-react'
  import {useRef} from 'react';
  import './css/EditInfo.css';

export const Edit_info = (props) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const formData = new FormData();
    const[filename,setFileName]= useState("");
    const[fname,setFname] = useState(props.info.fname);
    const[lname,setLname] = useState(props.info.lname);
    const[interests,setInterests] = useState(props.info.interests);
    const[old_password,setOld_password] = useState("");
    const[new_password,setNew_password] = useState("");
    const[affiliations,setAffiliations] = useState(props.info.affiliations);

    const[author_id,setAuthorID] = useState("");   /* I add these new variables */
    const[offset,setOffset] = useState("");           /* I add these new variables */
    const[api_key,setApiKey] = useState("");
    const[gs_error,setgs_error] = useState(0);

    const[picture,setPicture] = useState();
    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }   
        event.target.value = null;
        setPicture(fileObj);
        setFileName(fileObj.name);
      };
    const handleClick = () => {
        inputRef.current.click();
      };
    const edit_info= async() => {
      let formValues= {
        fname,
        lname,
        interests,
        user_id:props.info.userId,
        affiliations
      }
      const response=await dispatch(edit_acc_info(formValues));
    }
    const change_pass= async() => {
      let formValues= {
        old_password,
        new_password,
        user_id:props.info.userId
      }
      const response=await dispatch(change_password(formValues));
    }
    const upload_picture = async () =>{
       formData.append('user_id',props.info.userId);
        formData.append('file',picture);
        const response=await dispatch(upload_Picture(formData));
    }


    /* New feature Function */

    const Import_from_GS= async() => {
      let formValues= {
        user_id:props.info.userId,
        author_id,
        offset,
        api_key,
      }
      
      const response= await dispatch(google_scholar_get(formValues));
      response.slice(0,20).map(async (post,index) =>{
     
        let data ={
          user_id:props.info.userId,
          title:post.title,
          publication:post.publication,
          link:post.link,
          authors:post.authors,
          viewable:1,

        }
       //transfer_data(data);
       const response1= await dispatch(add_post_scholar(data));
      if(response1 === 0){
        document.getElementsByClassName("Error_Span")[0].style.display = 'block';
      }
      else{
        document.getElementsByClassName("Success_Span")[0].style.display = 'block';
      }
      })
     
    }



  return (
    <div style={{"marginTop":"30px"}}>
    <Segment>
        <h3>Edit your info</h3>
        <Form>
            <div>
            <Form.Group widths='equal'>
            <Form.Field
                control={Input}
                label='First name'
                placeholder='First name'
                value={fname}
                onChange={(e)=>setFname(e.target.value)}
            />
            <Form.Field
                control={Input}
                label='Last name'
                placeholder='Last name'
                value={lname}
                onChange={(e)=>setLname(e.target.value)}
            />
            </Form.Group>
            <Form.Field
                control={Input}
                label='Affiliations'
                placeholder='Affiliations'
                value={affiliations}
                onChange={(e)=>setAffiliations(e.target.value)}
            />
            <Form.Field
                control={TextArea}
                label='Interests'
                placeholder='Tell us about yourself'
                value={interests}
                onChange={(e)=>setInterests(e.target.value)}
            />
          <Button  className="apply" onClick={edit_info} style={{"width":"10%"}}>Apply</Button>
          </div>
         <br/><br/><br/>
          <div className="picture">
          <Header as='h4' style={{"marginBottom":"0px"}}floated='left'>Upload picture: </Header> 
          <a>{filename} </a>
          <br></br>
          
            <Button 
                animated 
                style={{"width":"20%","marginRight":"10px"}}
                onClick={handleClick}
            >
                <Button.Content visible>
                    <Icon name='picture' />
                </Button.Content>
                <Button.Content hidden>
                    <Icon name='upload' />
                </Button.Content>
            </Button>
            <Button className="save" style={{"backgroundColor":"#00b5ad"}} onClick={upload_picture}>
                Save
            </Button>
            
              <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    accept="image/png, image/jpeg" 
                    onChange={handleFileChange}
                />
         </div>
            
        </Form>
    </Segment>
    <Segment>
        <h3>Change Password</h3>
        <Form>
            <Form.Group widths='equal'>
            <Form.Input
                type='password'
                label='Last Password'
                placeholder='*******'
                value={old_password}
                onChange={(e)=>setOld_password(e.target.value)}
            />
             <Form.Input
                type='password'
                label='New Password'
                placeholder='*******'
                value={new_password}
                onChange={(e)=>setNew_password(e.target.value)}
            />
             
            </Form.Group>
            <Button  className="apply" onClick={change_pass} style={{"width":"10%"}}>Apply</Button>
            <br/> <br/>
        </Form>
        
    </Segment>
    <br></br>

    

  {/* Html code to submit form for google schoolar API */}

    <Segment>
        <h3 className='Import_title'>Import Paper from Google Scholar</h3>
        <span className='Error_Span'>Some papers has already imported!</span>
        <span className='Success_Span'>Success, some papers added to your Citebook Account!</span><br></br>
        <Form>
          <Form.Field
                control={Input}
                label = 'Author ID'
                placeholder='Author ID from Google Scholar'
                value={author_id}
                onChange={(e)=>setAuthorID(e.target.value)}
            />
            <Form.Field
                className='offset_num'
                control={Input}
                label='Offset Number (For Example Offset 0 -> Articles 1-20 , Offset 20 -> Articles 21-40)'
                placeholder='Offset Number'
                value={offset}
                onChange={(e)=>setOffset(e.target.value)}
            />
            <Form.Field
                control={Input}
                label='API Request key'
                placeholder='API key'
                value={api_key}
                onChange={(e)=>setApiKey(e.target.value)}
            />

          <Button icon className="Submit_GS" onClick={Import_from_GS}>
          <Icon name='check' color='black'  />Import Papers</Button><br></br><br></br>

        </Form>
      </Segment>
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
      info: state.auth
    };
  };


export default connect(mapStateToProps, {})(Edit_info)