import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Table,Input,Button} from 'reactstrap'
import {Redirect} from 'react-router-dom';


import axios from 'axios';

import "./Ten_Dashboard.css";




export default class Ten_Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            p_username : sessionStorage.getItem("p_username"),
            type: sessionStorage.getItem("type"),
            apartment: [],
            showApartment: false,
            city: "Montreal",
            logout: false
        }
    }


    componentWillMount()
    {
        this.setState({logout: false})

    }

    logout = () =>{
        sessionStorage.removeItem("p_username");
        sessionStorage.removeItem("type")
        this.setState({logout: true})
       // this.props.history.push('/');
    }

    aptList=()=>{
        const list = this.state.apartment.map((apartment)=>
            <tr>
                <td>{apartment.apt} </td>
                <td>{apartment.street}</td>
                <td>{apartment.city}</td>
                <td>${apartment.rent}</td>
            </tr>
        );
        //return table
        return(
            <Table dark>
                <tr>
                <td>apartment</td>
                <td>street</td>
                <td>city</td>
                <td>rent</td>
                </tr>
            {list}</Table>
        )
    }

    search_handler = () => {
        console.log("click");
     axios.post('/api/tenant/search',{city: this.state.city})
     .then((response)=>{this.setState({apartment : response.data.apartment});
        console.log(response);
        this.setState({showApartment: true});
    })
     .catch((err)=>{
         console.log(err);
     })
    }
    render() {
        return (
            <div>
                {this.state.logout?<Redirect to="/"/>:null}
                 <h1>{this.state.type}Dasboard</h1>
                    <div>
                    <table className="ten_table">
                        <tr>
                            <td>
                                <Input type="select" onChange={(e)=>{this.setState({city : e.target.value})}}>                              
                                <option value = "Montreal"  >Montreal</option>
                                <option value = "Winnipeg"  >Winnipeg</option>
                                <option value = "Toronto"   >Toronto</option>
                                <option value = "Vancouver" >Vancouver</option>
                                <option value = "Halifax"   >Halifax</option></Input>
                            </td>
                            <td>
                                <Button onClick={this.search_handler}>Search</Button>
                            </td>
                        </tr>
                    </table>
                    <br/>
                    {(!this.state.showApartment)?null:this.aptList()}
                    </div>           
                    <br/>
                    <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}