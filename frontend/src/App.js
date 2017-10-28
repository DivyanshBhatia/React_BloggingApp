import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar'
import HomePageComponent from './components/HomePageComponent'
import SubmitArticleComponent from './components/SubmitArticleComponent'
import DisplayPostComponent from './components/DisplayPostComponent'

import { Route,withRouter } from 'react-router';


class App extends Component {


  render() {
    return (
      <div>
          
            <div style={{ display: 'flex' }}>
              <div className="Navigation">
              <NavigationBar/>
                              
              </div>
            <div style={{ flex: 1, padding: '15px' }}>
             
              <Route exact component={HomePageComponent} path="/" />
              <Route exact component={HomePageComponent} path="/category/:category"/>
              <Route exact component={DisplayPostComponent} path="/posts/:postId/display"/>
              
              <Route exact component={SubmitArticleComponent} path="/submit" />
              <Route exact component={SubmitArticleComponent} path="/posts/:postId/edit" />            
            </div>  
          </div>
      </div>
    );
  }
}


export default withRouter(App);
