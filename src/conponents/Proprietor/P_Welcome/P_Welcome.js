import React, { Component } from 'react'
import {Button,Input} from 'reactstrap'
import {connect} from 'react-redux'

import axios from 'axios';
import './P_Welcome.css'
import * as actions from'../../action/action'

class P_Welcome extends Component {

    constructor(props){
      super(props);
      this.state ={
         username: "",
         password:"",
         warningmessage: ""
      }
    }
  
      closeLoginHandler= ()=>{
          document.querySelector('.pw_login').style.display = 'none';
      }
  
      openLoginHandler= ()=>{
          document.querySelector('.pw_login').style.display = 'flex';
      }
  
      usernameHandler = (e) =>{
          this.setState({username: e.target.value});
      }
  
      passwordHandler = (e)=>{
          this.setState({password: e.target.value})
      }
  
      summitHandler = ()=>{
          if(this.state.username ===""){
              this.setState({warningmessage:"username can't be empty"})
          }
          else if(this.state.password ==="")
          {
              this.setState({warningmessage:"password can't be empty"})
          }
          else
          {
              axios.post('http://localhost:5000/proprietor/login',{
                  username: this.state.username,
                  password: this.state.password
              })
              .then((response)=>{
                  var hasUser = response.data.hasUser;
                  if(!hasUser)
                  {
                      this.setState({warningmessage: "we don't have this user"})
                  }
                  else
                  {
                     this.props.get_P_User(response.data.username);
                     this.props.get_P_Token(response.data.token);
                  }
              })
              .catch((err)=>{
                  console.log(err);
              })
  
  
          }
      }
  
      render() {
          return (
              <div>
                  <h1>
                      Welcome Proprietor
                  </h1>
                  <Button className="pw_button" onClick={this.openLoginHandler}>login</Button>
                  <Button className="pw_button" href="/porpritor/reg">Register</Button>
                  <Button className="pw_button" href="/porpritor/form">From</Button>
                  
                  {/** Login content */}
                  <div className="pw_login">
                  <div className="pw_login_content">
                      <div className="close"><p className="close_x" onClick={this.closeLoginHandler}>+</p></div>
                      <h2>Login</h2>
                      <Input className="pw_login_content_input" placeholder="username" type="text" onChange={this.usernameHandler} value={this.state.username}></Input>
                      <Input className="pw_login_content_input" placeholder="password" type="password" onChange={this.passwordHandler} value={this.state.password}></Input>
                      <Button className="pw_login_content_input" color="primary" onClick={this.summitHandler}>Summit</Button>
                  </div>
                      </div>
              </div>
  
          )
      }
  
  
  
  
  }
  const mapDispatchToProps=(dispatch)=>
  {
      return{
      get_P_User : (event) =>dispatch({type: actions.GET_P_USER,name: event}),
      get_P_Token: (event)=>dispatch({type: actions.GET_P_TOKEN,value : event})
      }
  }
  
  export default connect (null,mapDispatchToProps)(P_Welcome);