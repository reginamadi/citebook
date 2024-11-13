import _ from 'lodash';
import { connect,useDispatch } from 'react-redux'
import { Button, Icon, Label, Placeholder } from 'semantic-ui-react';
import './css/Search_bar.css';
import React from 'react';
import { Search, Grid, Header, Segment,Form,TextArea,Input } from 'semantic-ui-react';
import { feed_post, search_feed,my_post } from '../actions';


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

function Search_Bar(props) {
  
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
      if(window.location.href=="http://localhost:3000/citebook"){
        dispatch_mine(feed_post(props.userId));
      }
      else if(window.location.href=="http://localhost:3000/citebook/papers"){
        dispatch_mine(my_post(props.userId));
      }
        return
      }

      const re = new RegExp(_.escapeRegExp(data.value), 'i')
       //   result={...result,title:result.fname}
      const isMatch = (result) => re.test(result.description+result.title+result.authors+result.keywords)

      dispatch({
        type: 'FINISH_SEARCH',
        results: _.filter(props.post_list, isMatch),
      })
    }, 300)
  }, [props.post_list])

  React.useEffect(() => {
  
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [props.post_list])

  return (

        <Search
        className='posts'
          size='large'
          loading={loading}
          placeholder='Search...'
          onResultSelect={(e, data) =>{
            dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title });
            dispatch_mine(search_feed(results));
           } }
          onSearchChange={handleSearchChange}
          results={results}
          value={value}
        />
        
     
     
     
        
  )
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    post_list: state.post.new_posts
  };
};


export default connect(mapStateToProps, {})(Search_Bar)