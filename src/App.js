import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Welcome from './conponents/WelcomePage/WelcomePage'
import RentalForm from './conponents/RentalForm/RentalForm'



import { connect } from 'react-redux';


import axios from 'axios';



class App extends Component {

  render(){
  return (
    <div className="App">
    <Router>
      <Route exact path="/" component={Welcome}/>
      <Route exact path="/porpritor/register" component={RentalForm}/>

    </Router>
     
    </div>
  );
  }
}

const mapStatetoProps=(store)=>{
  return{
    propertor : store.proprietor.name
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    getName: (e)=>dispatch({type: 'UPDATE_A',name:e})
  }
}


export default connect(mapStatetoProps,mapDispatchToProps)(App);
