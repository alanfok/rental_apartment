import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Spinner} from 'reactstrap'
import axios from 'axios';
import "./Login_Conponent.css";

import * as type from "../../../type/type"

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
            usertype: "",
            hasUser:false,
            spinner: false      
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
        this.setState({ spinner: true })
        if(this.state.username ===""){
            this.setState({ spinner: false });
            this.setState({warningmessage:"username can't be empty"})
        }
        else if(this.state.password ==="")
        {
            this.setState({ spinner: false });
            this.setState({warningmessage:"password can't be empty"})
        }
        else
        {
            if(this.props.name === type.Proprietor)
            {
            this.proprietorLoginHandler();
            }
            else
            {
                this.tenantLoginHandler();
            }
        }
    }

    //PropietorLogin
    proprietorLoginHandler = () =>{
        axios.post('/api/proprietor/login',{
            username: this.state.username,
            password: this.state.password
        })
        .then((response)=>{//return from back-end
            var hasUser = response.data.hasUser;
            console.log(hasUser)
            if(!hasUser)
            {
                this.setState({ spinner: false })
                this.setState({warningmessage: "we don't have this user"})
            }
            else
            {            
              this.setState({ spinner: false })
              localStorage.setItem("type",type.Proprietor)
              localStorage.setItem("p_username" ,response.data.username)
              this.setState({redirect : true})
          }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    //TenantLogin
    tenantLoginHandler = () =>{
        axios.post('/api/tenant/login',{
            username: this.state.username,
            password: this.state.password
        })
        .then((response)=>{//return from back-end
            var hasUser = response.data.hasUser;
            console.log(hasUser)
            if(!hasUser)
            {
                this.setState({ spinner: false })
                this.setState({warningmessage: "we don't have this user"})
            }
            else
            {            
              //this.props.get_P_User(response.data.username);
              //this.props.get_P_Token(response.data.token);
              this.setState({ spinner: false })
              localStorage.setItem("type",type.Tenant);
              localStorage.setItem("p_username" ,response.data.username);
              this.setState({redirect : true})
          }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div className="pro_login_conponenet_bg">
               
               {(this.state.redirect)?<Redirect to="/porpritor/dashboard"/>:null}
                <h3 >{this.props.name} Login</h3>
                <input className="pro_login_conponenet_input" placeholder="Username" type="text" onChange={this.usernameHandler}></input>
                <br/>
                <input className="pro_login_conponenet_input" placeholder="Password" type="password" onChange={this.passworkHandler}></input>
                <br/>
                <p>{this.state.warningmessage}</p>
                <p>{(this.state.spinner)?<Spinner size="sm" color="primary" />:" "}</p>
                {this.state.usertype}
                <button className="pro_login_conponenet_button" onClick={this.LoginHandler}>Login</button>
                <button className="pro_login_conponenet_button" onClick={this.props.childTroggle}>Signup</button>
            </div>
        )
    }
}

export default Pro_Login_Conponent
