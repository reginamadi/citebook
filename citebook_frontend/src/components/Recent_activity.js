import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Card, Feed } from 'semantic-ui-react'
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { get_picture_url } from '../actions'

export const Recent_activity = (props) => {
  

  return (
    <Card.Content>
    <Feed>
      <Feed.Event>
        <Feed.Label image= {`http://localhost:8000/${props.noti.file_path}`} /> 
        <Feed.Content>
          <Feed.Date content={props.date} />
          <Feed.Summary>
           <a>{props.noti.fname} {props.noti.lname}</a> liked your post 
           "<a>{props.noti.title}</a>".
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
      </Feed>
      </Card.Content>
  )
}

const mapStateToProps = (state) => {
  return {
    info: state.info
  };
};



export default connect(mapStateToProps, {})(Recent_activity)