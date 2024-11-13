import _ from 'lodash';
import { connect,useDispatch } from 'react-redux'
import { Button, Icon, Label, Placeholder } from 'semantic-ui-react';
import './css/Search_bar.css';
import React from 'react';
import { Search, Grid, Header, Segment,Form,TextArea,Input } from 'semantic-ui-react';
import { feed_post, search_feed,my_post,get_usernames,get_users } from '../actions';


const initialState = {
  loading: false,
  results: [],
  value: '',
}

function exampleReducer(state, action) {

  switch (action.type) {
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results }
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

function Search_Users(props) {
  		
const resultRenderer = ({ fname }) => <Label content={fname} />
  const [state, dispatch] = React.useReducer(exampleReducer, initialState);
  const { loading, results, value } = state;
  const dispatch_mine = useDispatch();

  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current)
    dispatch({ type: 'START_SEARCH', query: data.value })

    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        dispatch_mine(get_usernames(props.userId));
    //  if(window.location.href=="http://localhost:3000/citebook"){
     //   dispatch_mine(feed_post(props.userId));
    //  }
    //  else if(window.location.href=="http://localhost:3000/citebook/papers"){
     //   dispatch_mine(my_post(props.userId));
    //  }
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
      const isMatch = (result) =>{
       // result={...result,title:result.fname}
     return   re.test(result.title);
      }

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(props.users, isMatch),
      })
    }, 300)
  }, [props.user_list])

  React.useEffect(() => {
  props.users.map((user,index)=>{
    props.users[index]={...props.users[index],title:`${user.fname} ${user.lname}`}
  })
  
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [props.users])

  return (
   
    <Grid>
        <Grid.Column width={16} style={{"paddingRight":"0px","paddingLeft":"0px"}}>
      
        <Search
        icon="add user"
        className='users'
          size='small'
          loading={loading}
          placeholder='Search...'
          onResultSelect={(e, data) =>{
          //  data.result.title=`${data.result.fname} ${data.result.lname}`
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.fname +" "+ data.result.lname });
            dispatch_mine(get_users(results));
           } }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
         
    
      </Grid.Column>
    
      
      </Grid>
        
  )
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    post_list: state.post.new_posts,
    user_list:state.info.user_list
  };
};


export default connect(mapStateToProps, {})(Search_Users)