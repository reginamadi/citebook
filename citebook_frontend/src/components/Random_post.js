import React,{useState,useEffect,useRef} from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Icon, Header, Image, Container, Segment,Form
    ,TextArea,Checkbox,Label } from 'semantic-ui-react';

export const Random_post = (props) => {

    useEffect(()=>{
       //na checkari an en dika m na kamo true flag
    });
    return (
    <Container > <Segment raised style={{"marginRight":"10px","marginBottom":"20px"}}>
        <div className="title" style={{"height":"auto","width":"auto"}}>
        <Image src={"http://localhost:8000/"+props.post.file_path} circular floated="left"/>
        <br/>
            <h4 style={{"margin":"0px","wordWrap": "break-word"}}>{props.post.title}</h4>
            </div>
            
        </Segment></Container>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Random_post)