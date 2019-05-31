import React, { Component } from 'react'

import {Form, FormGroup,Label,Input,Button} from 'reactstrap'

import axios from 'axios';
import './Pro_Signup_Conponent.css'

export default class Pro_Signup_Conponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            username :"",
            email:"",
            password: "",
            re_password:"",
            req_name:"pro_signup_conponent_input",
            req_email:"pro_signup_conponent_input",
            req_password:"pro_signup_conponent_input",
            req_re_password:"pro_signup_conponent_input",
            result:""
        }
    }

    registerHandler=()=>{

            if(this.state.username==="")
            {
                this.setState({req_name: "pro_signup_conponent_input_required"})
            }
            else if(this.state.email===""){
                this.setState({req_email: "pro_signup_conponent_input_required"})       
            }
            else if(this.state.password===""||this.state.password!==this.state.re_password){
                this.setState({req_password: "pro_signup_conponent_input_required"})     
            }
            else if(this.state.re_password===""||this.state.password!==this.state.re_password){
                this.setState({req_re_password: "pro_signup_conponent_input_required"})    
            }
            else{
                axios.post('/proprietor/register_pro',{
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
                .then(response=>{this.setState({result: response.data})})
                .catch((err)=>{
                    console.log(err);
                })
            }
    }

    render() {   
        return (
            <div className="pro_signup_conponent_bg">
                <h1>Proprieor RegisterForm</h1>
                
                <Form >
                    <FormGroup>
                        <Label className='lable'>Username</Label>
                        <br/>
                        <input className={this.state.req_name} placeholder = "username" onChange={(e)=>{this.setState({username: e.target.value})}} value={this.state.username}></input>
                        <br/>
                        <Label className='lable'>E-mail</Label>
                        <br/>
                        <input className={this.state.req_email} placeholder = "e-mail" type="email" onChange={(e)=>{this.setState({email: e.target.value})}} value={this.state.email} ></input>
                        <br/>  
                        <Label className='lable'>password</Label>
                        <br/>
                        <input className={this.state.req_password} placeholder = "password" type="password" onChange={(e)=>{this.setState({password: e.target.value})}} value={this.state.password} ></input>
                        <br/>
                        <Label className='lable'>re-password</Label>
                        <br/>
                        <input className={this.state.req_re_password} placeholder = "re-password" type="password" onChange={(e)=>{this.setState({re_password: e.target.value})}} value={this.state.re_password}></input>    
                        <br/>              
                        <br/>     
                        <button onClick={this.registerHandler}  >Register</button>    
                        <br/>
                        <p>{this.state.result}</p>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

