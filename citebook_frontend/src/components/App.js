import React from "react";
import Header from './Header';
import HomePage from "./HomePage";
import history from '../history';
import LogIn from "./LogIn";
import Register from "./Register";
import Logged_HomePage from "./Logged_HomePage";
import {  Route,Router,Switch} from 'react-router-dom';
import Followers_list from "./Followers_list";
import Profile_page from "./Profile_page";
import Reset_pass from "./Reset_pass";
import Reset_pass_step2 from "./Reset_pass_step2";


const App=() => {
    return (
    <div className="ui container" style={{"width":"100%"}}>
       
        <Router history={history}>
            <Header/> 
            <Switch>
                <Route path="/" exact component={LogIn} />
                <Route path="/reset" exact component={Reset_pass}/>
                <Route path="/reset/:token" component={Reset_pass_step2}/>
                <Route path="/login" exact component={LogIn}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/citebook/profile/"  component={Profile_page}/>
                <Route path="/citebook"  component={Logged_HomePage}/>       
            </Switch>
        </Router>
        
    </div>
    );
};

export default App;