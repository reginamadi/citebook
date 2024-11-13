import React, { Component } from 'react'
import './css/Upload_comp.css';
import Edit_info from './Edit_info';
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

/*
export const Import_GS = (props) => {
    return (
      <div className='Import_from_GS'>
        <h3 className='Import_title'>Import Paper from Google Scholar</h3><br></br>

        <Form>
          <Form.Input placeholder='Author ID' />
          <Form.Input placeholder='Offset Number (For Example Offset 0 ->Articles 1-20, Offset 20 ->Articles 21-40)'/>

          <Form.Field
                control={Input}
                placeholder='Author ID from Google Scholar'
                value={author_id}
                onChange={(e)=>setFname(e.target.value)}
            />
            <Form.Field
                control={Input}
                label='Last name'
                placeholder='Last name'
                value={lname}
                onChange={(e)=>setLname(e.target.value)}
            />


          <Button icon className="Submit_GS" onClick={console.log("pressed")}>
          <Icon name='check' color='black'  />Import Papers</Button><br></br><br></br>
        </Form>
      </div>
  )

}

export default Import_GS;
*/


/*
  function Request_data(props) {
    useEffect(() => {
      fetch(`https://serpapi.com/search.json?engine=google_scholar_author&author_id=-xDtoxYAAAAJ&hl=en&start=0&api_key=05f4198376581658c9964c45c3ee3cf56fb89d3284a0e4f8a7dc45dac9b6997d`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((actualData) => console.log(actualData))
        .catch((err) => {
          console.log(err.message);
        });
    }, []);
  }*/