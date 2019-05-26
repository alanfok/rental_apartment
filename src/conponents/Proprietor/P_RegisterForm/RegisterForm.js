import React, { Component } from 'react'
import {Form, FormGroup,Label,Input,Button} from 'reactstrap'

import axios from 'axios';
import './RegisterForm.css'


export default class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username :"",
            email:"",
            password: "",
            re_password:"",
            req_name:"input",
            req_email:"input",
            req_password:"input",
            req_re_password:"input",
            result:""
        }
    }

    registerHandler=()=>{

            if(this.state.username==="")
            {
                this.setState({req_name: "input_required"})
            }
            else if(this.state.email===""){
                this.setState({req_email: "input_required"})       
            }
            else if(this.state.password===""||this.state.password!==this.state.re_password){
                this.setState({req_password: "input_required"})     
            }
            else if(this.state.re_password===""||this.state.password!==this.state.re_password){
                this.setState({req_re_password: "input_required"})    
            }
            else{
                axios.post('http://localhost:5000/proprietor/register_pro',{
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


   Component

    render() {   
       let name = this.state.req_name;
        return (
            <div className="retalFormbg">
                <h1>Proprieor RegisterForm</h1>
                
                <Form className="retalForm">
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
                        <input className={this.state.req_password} placeholder = "password" type="password" onChange={(e)=>{this.setState({password: e.target.value})}} value={this.state.password} ></input>
                        <Label className='lable'>re-password</Label>
                        <input className={this.state.req_re_password} placeholder = "re-password" type="password" onChange={(e)=>{this.setState({re_password: e.target.value})}} value={this.state.re_password}></input>    
                        <br/>              
                        <br/>     
                        <Button onClick={this.registerHandler}  >Register</Button>    
                        <br/>
                        <p>{this.state.result}</p>
                    </FormGroup>
                </Form>
            </div>
        )

    }
}
