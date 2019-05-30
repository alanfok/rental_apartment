import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

import axios from 'axios';
import "./Pro_Login_Conponent.css";

export class Pro_Login_Conponent extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = 
        {
            username: "",
            password:"",
            redirect: false,
            warningmessage:"",
            hasUser:false          
        }
    }

    usernameHandler = ( event ) =>
    {
        this.setState({username : event.target.value})
    }

    passworkHandler = ( event ) =>
    {
        this.setState({password : event.target.value})
    }

    LoginHandler = () =>
    {
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
            .then((response)=>{//return from back-end
                var hasUser = response.data.hasUser;
                console.log(hasUser)
                if(!hasUser)
                {
                    this.setState({warningmessage: "we don't have this user"})
                }
                else
                {            
                  //this.props.get_P_User(response.data.username);
                  //this.props.get_P_Token(response.data.token);
 
                  localStorage.setItem("p_username" ,response.data.username)
                  this.setState({redirect : true})
              }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    render() {
        return (
            <div className="pro_login_conponenet_bg">
               
               {(this.state.redirect)?<Redirect to="/porpritor/p_dashboard"/>:null}
                <h3 >Proprietor Login</h3>
                <input className="pro_login_conponenet_input" placeholder="Username" onChange={this.usernameHandler}></input>
                <br/>
                <input className="pro_login_conponenet_input" placeholder="Passwork" onChange={this.passworkHandler}></input>
                <br/>
                <p>{this.state.warningmessage}</p>
                <button className="pro_login_conponenet_button" onClick={this.LoginHandler}>Login</button><button className="pro_login_conponenet_button" onClick={this.props.childTroggle}>Signup</button>
            </div>
        )
    }
}

export default Pro_Login_Conponent
