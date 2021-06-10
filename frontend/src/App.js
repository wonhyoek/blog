import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import UserProfile from "./components/views/UserProfile/UserProfile";
import FeedDetailPage from './components/views/FeedDetailPage/FeedDetailPage';
import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth";

function App() {
  return (
      <Router>
        <NavBar/>
        <div style = {{maxWidth: '700px', display: 'flex', justifyContent:'center', alignItems: 'center',
          margin: 'auto', marginTop: '50px'
        }}>
          <Switch>
            <Route exact path = '/' component = {Auth(LandingPage, null)}/>
            <Route exact path = '/login' component = {Auth(LoginPage, false)}/>
            <Route exact path = '/register' component = {Auth(RegisterPage, false)}/>
            <Route exact path = '/userProfile' component = {Auth(UserProfile, true)}/>
            <Route exact path = '/feeds/:id' component = {Auth(FeedDetailPage, null)}/>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
