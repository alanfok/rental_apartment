import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from './conponents/WelcomePage/WelcomePage'
import P_rentalForm from './conponents/Proprietor/P_RentalForm/RentalForm'
import P_register from './conponents/Proprietor/P_RegisterForm/RegisterForm'
import P_welcome from './conponents/Proprietor/P_Welcome/P_Welcome'
import P_dashboard from './conponents/Proprietor/P_Dashboard/P_Dasboard'


import { connect } from 'react-redux';


import axios from 'axios';



class App extends Component {

  render(){
  return (
    <div className="App">
    <Router>
      <Switch>
      <Route exact path="/" component={Welcome}/>
      <Route exact path="/porpritor/welcome" component={P_welcome}/>
      <Route exact path="/porpritor/form" component={P_rentalForm}/>
      <Route exact path="/porpritor/reg" component={P_register}/>
      <Route exact path="/porpritor/p_dashboard" component={P_dashboard}/>
      </Switch>
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
