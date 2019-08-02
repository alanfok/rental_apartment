import React, { Component } from 'react'
import {Form, FormGroup,Label,Input,Button} from 'reactstrap'
import PropTypes from 'prop-types'
import axois from 'axios'


import './RentalForm.css';


export class RentalForm extends Component {
    static propTypes = {
    }
    constructor(props){
        super(props);
        this.state={
            username: localStorage.getItem("p_username"),
            n_apt: null,
            s_street: "",
            size : 3,
            price: "",
            pet: false,
            smoke: false,
            comment:"",
            warningMsg: ""
        }
    }

    petAllowHandler = () =>{
        this.setState({pet: !this.state.pet})
    }


    smokeAllowHandler = () =>{
        this.setState({smoke: !this.state.smoke})
    }


    sizeSelectHandle = (event) =>{
        if(event.target.value == '1')
        {this.setState({size : 1})}
        else if(event.target.value =='3')
        {this.setState({size : 3})}
        else if(event.target.value =='4')
        {this.setState({size : 4})}
        else if(event.target.value =='5')
        {this.setState({size : 5})}
        else
        {this.setState({size : 6})}
    }

    sumbitHandler =()=>{
        if(this.state.s_street === "")
        {
            this.setState({warningMsg: "missing street"})
        }
        else if(this.price ==="")
        {
            this.setState({warningMsg: "missing price"})
        }
        else{
            axois.post('/api/proprietor/registerform',
            {
                s_name: this.state.username,
                n_apt: this.state.n_apt,
                s_street: this.state.s_street,
                size: this.state.size,
                price: this.state.price,
                pet: this.state.pet,
                smoke: this.state.smoke,
                comment: this.state.comment
            })
            .then((response)=>{

                if(response.data.message === "success")
                {
                    this.setState({warningMsg: "success"})
                }
                else
                {
                    this.setState({warningMsg: "fail"})
                }

            })
            .then(()=>{
                if(this.state.warningMsg === "success")
                {
                    window.location.href = "/porpritor/dashboard"
                }
            })
            .catch((err)=>console.log(err))
            }
    }
    
    render() {
        const username = localStorage.getItem("p_username");
        const type =localStorage.getItem("type")
        if(username ===null && type === null)
        {
            return(
                <div>
                    <h1>You Haven't log in</h1>
                </div>
            )
        }
        else
        {
                return (
                <div className="retalFormbg">
                    <h1>Apartment Register Form</h1>

                    <Form className="retalForm">
                        <FormGroup>
                            <Label className="lable">Apartment number</Label>
                            <Input placeholder = "#ApportmentNumber" type="number" onChange={(event)=>{this.setState({n_apt: event.target.value})}} value={this.state.n_apt}></Input>
                            <Label className="lable">Street</Label>
                            <Input placeholder = "street" type="text" onChange={(event)=>{this.setState({s_street: event.target.value})}} value={this.state.s_street}></Input>
                            <Label className="lable">Size</Label>
                            <Input type="select" onChange={this.sizeSelectHandle}>
                            <option value="1">
                                studio
                            </option>
                            <option value="3">
                                3&frac12;
                            </option>
                            <option value="4">
                                4&frac12;
                            </option>
                            <option  value="5">
                                5&frac12;
                            </option>
                            <option  value="6">
                            bigger
                            </option>
                            </Input>
                            <Label className="lable">Rent</Label>
                            <Input placeholder = "$" type="number" onChange={(event)=>{this.setState({price: event.target.value})}} value={this.state.price}></Input>
                            <Label className="lable">Checkbox</Label>
                            <br/>
                            <span className="checkbox">
                            <Input type="checkbox" checked={this.state.pet} onChange={this.petAllowHandler} ></Input>pet allow
                            </span>         
                            <br/>
                            <span className="checkbox">
                            <Input type="checkbox" checked={this.state.smoke} onChange={this.smokeAllowHandler} ></Input>smoke allow
                            </span>           
                            <br></br>
                            <br></br>
                            <Label>Comment</Label>
                            <Input type="textarea" onChange={(e)=>{this.setState({comment: e.target.value})}} value={ this.state.comment} rows="4"></Input>
                            <br/>
                            <Button onClick={this.sumbitHandler}  >Submit</Button>    
                            <br/>
                            {this.state.warningMsg}
                        </FormGroup>
                    </Form>
                </div>
            )
        }
    }
}

export default RentalForm

