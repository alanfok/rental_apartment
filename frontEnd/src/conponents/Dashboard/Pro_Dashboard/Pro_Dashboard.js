import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Table} from 'reactstrap'
import {Redirect} from 'react-router-dom';


import axios from 'axios'



export default class Pro_Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            p_username : sessionStorage.getItem("p_username"),
            type: sessionStorage.getItem("type"),
            apartment: [],
            logout: false
        }
    }


    componentWillMount()
    {
        this.setState({logout: false})
        axios.post('/api/proprietor/fetch',{
            owner: sessionStorage.getItem("p_username")
        })
        .then((response)=>{
            this.setState({apartment: response.data.apt})
        })
        .catch((err)=>console.log(err));

    }

    logout = () =>{
        sessionStorage.removeItem("p_username");
        sessionStorage.removeItem("type")
        this.setState({logout: true})
       // this.props.history.push('/');
    }

    DeleteApt = (id)=>{
         axios.post('/api/proprietor/deleteApt',{
            id:id
         })
         .then(
            (response)=>{
                console.log(response.data);
                window.location.reload();
            }
         )
    }

    aptList=()=>{
        const list = this.state.apartment.map((apartment)=>
            <tr>
                <td>{apartment.apt} </td>
                <td>{apartment.street}</td>
                <td>{apartment.city}</td>
                <td>${apartment.rent}</td>
                <td><button onClick={()=>this.DeleteApt(apartment.id)}>x</button></td>
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

    render() {
        return (
            <div>
                {this.state.logout?<Redirect to="/"/>:null}
                 <h1>{this.state.type}Dasboard</h1>

                    <div>
                    {this.aptList()}
                    </div>
                    
                    <br/>
                    <button onClick={this.logout}>Logout</button>
                    <Link to="/porpritor/form"><button>Register Apartment</button></Link>
            </div>
        )
    }
}
