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
            n_apt: "",
            s_street: "",
            size : 3,
            price: "",
            pet: false,
            smoke: false
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
        axois.post('http://localhost:5000/proprietor/registerform',
        {
            n_apt: this.state.n_apt,
            s_street: this.state.s_street,
            size: this.state.size,
            price: this.state.price,
            pet: this.state.pet,
            smoke: this.state.smoke
        })
        .catch((err)=>console.log(err))
    }

    render() {
    
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
                        <Input type="checkbox" checked={this.state.pet} onClick={this.petAllowHandler}></Input>pet allow
                        </span>         
                        <br/>
                        <span className="checkbox">
                        <Input type="checkbox" checked={this.state.smoke} onClick={this.smokeAllowHandler}></Input>smoke allow
                        </span>           
                        <br></br>
                        <Button onClick={this.sumbitHandler}>Submit</Button>    
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default RentalForm

