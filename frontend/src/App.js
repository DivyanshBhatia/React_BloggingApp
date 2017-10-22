import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar'
import HomePageComponent from './components/HomePageComponent'
import SubmitArticleComponent from './components/SubmitArticleComponent'
import { Route,Switch } from 'react-router';
import {connect} from 'react-redux'
import {fetchAllPosts,fetchAllCategories} from './actions/index'

class App extends Component {
componentWillMount(){
  this.props.fetchAllPosts();
  this.props.fetchAllCategories();
}

  render() {
    return (
      <div>
          
            <div style={{ display: 'flex' }}>
              <div className="Navigation">
              <NavigationBar/>
                              
              </div>
            <div style={{ flex: 1, padding: '15px' }}>
             <Switch>
              <Route exact component={HomePageComponent} path="/" />
              <Route exact component={HomePageComponent} path="/category/:category"/>
              <Route exact component={SubmitArticleComponent} path="/submit" />
            </Switch>
            </div>  
          </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
  }
}
const mapDispatchToProps = {fetchAllPosts,fetchAllCategories}


export default connect(mapStateToProps,mapDispatchToProps)(App);
