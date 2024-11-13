import React,{useState} from 'react'
import './css/Upload_comp.css';
import { Search, Grid, Header, Segment,Form,TextArea,Input } from 'semantic-ui-react';
import { Button, Icon, Label, Placeholder,Checkbox } from 'semantic-ui-react';
import {useRef} from 'react';
import { connect } from 'react-redux';
import { useDispatch } from "react-redux";
import { add_post, feed_post, my_post } from '../actions';
import Swal from 'sweetalert2';
import Search_Bar from './Search_Bar'
import {useEffect} from 'react';


function Upload_comp(props) {
    const dispatch = useDispatch();
    const formData = new FormData();
    const[description,setDescription] = useState("");
    const[title,setTitle] = useState("");
    const[authors,setAuthors] = useState("");
    const[keywords,setKeywords]= useState("");
    const[viewable,setViewable]=useState(false);
    const[filename,setFileName]= useState("");
    const[pdf,setPdf]= useState();
    const inputRef = useRef(null);
    const handleClick = () => {
      inputRef.current.click();
    };
    
    const handleFileChange = event => {
      const fileObj = event.target.files && event.target.files[0];
      if (!fileObj) {
        return;
      }   
      event.target.value = null;
      setFileName(fileObj.name);
      setPdf(fileObj);
    //  formData.append('file',fileObj);
    };
 const submit_post = async()=>{
      formData.append('file',pdf);
      formData.append('description',description);
      formData.append('authors',authors);
      if(viewable){
        formData.append('viewable',1);
      }
      else{
        formData.append('viewable',0);
      }
      formData.append('users_id',props.userId);
      formData.append('fname',props.fname);
      formData.append('lname',props.lname);
      formData.append('title',title);
      formData.append('keywords',keywords);
      
      const response=await dispatch(add_post(formData));
      if(response!==0){
        Swal.fire({
          icon: 'success',
          title: 'Uploaded succesfully',
        })
      }
      setTitle("");
      setDescription("");
      setAuthors("");
      setKeywords("");
      setViewable(false);
      if(window.location.href=="http://snf-889149.vm.okeanos.grnet.gr:3000/citebook/papers"){
        const response2= await dispatch(my_post(props.userId));
      }
      else if(window.location.href=="http://snf-889149.vm.okeanos.grnet.gr:3000/citebook"){
        const response3=await dispatch(feed_post(props.userId));
      }

  }
  
    return (
      <Grid>  
        <Grid.Row style={{"paddingBottom":"0px"}}> 
          <Grid.Column width={8}>
          </Grid.Column>
          <Grid.Column width={8}>
            <Search_Bar/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{"paddingTop":"0px"}}>       
      <Grid.Column width={16}> 
    <div className='upload_desc'>
            <Header as='h3' style={{"margin":"0px"}}>Upload your Paper</Header> 
            </div>
                    <Form>
                  
                      <Form.Input
                      placeholder='Title'
                      value={title}
                      onChange={(e)=>setTitle(e.target.value)}
                      />
                     
                      <Form.Input
                      placeholder='Authors'
                      value={authors}
                      onChange={(e)=>setAuthors(e.target.value)}
                      />
                     
                        <TextArea placeholder='Abstract' 
                          value={description}
                          onChange={(e)=>setDescription(e.target.value)}
                        />
                        <Form.Group>
                        <Form.Field
                        width='15'>
                        <Form.Input
                        
                        style={{"marginTop":'10px'}}
                      placeholder='Keywords'
                      value={keywords}
                      onChange={(e)=>setKeywords(e.target.value)}
                      />
                      </Form.Field>
                        <Form.Field style={{"marginTop":'20px'}}>
                        <Checkbox label='Viewable' 
                        checked={viewable}
                        onChange={(e)=>setViewable(!viewable)}
                        />
                      </Form.Field>
                      </Form.Group>
                    </Form>
            <div className='upload_bt'>    
                <Button icon className='a input' onClick={handleClick}>
                    <Icon name='file pdf' color='black' />
                        Upload paper pdf: {filename}
                </Button>
                <input
                    style={{display: 'none'}}
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                <Button icon className="b" type='submit' onClick={submit_post}>
                    <Icon name='check' color='black'  />
                        Submit post
                </Button>
            </div>

        </Grid.Column>
        </Grid.Row>
        </Grid>

  )
}


const mapStateToProps = (state) => {
    return {
      isSignedIn: state.auth.isSignedIn,
      userId: state.auth.userId,
      fname:state.auth.fname,
      lname:state.auth.lname,
      post_list: state.post.new_posts,
    };
  };
  export default connect(mapStateToProps,{add_post})(Upload_comp);