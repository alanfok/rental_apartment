import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as types from '../../type/type'
import {Table} from 'reactstrap'


import ProDashboard from './Pro_Dashboard/Pro_Dashboard'
import TenDashboard from './Ten_Dashboard/Ten_Dashboard'


import axios from 'axios'


class P_Dasboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            p_username : sessionStorage.getItem("p_username"),
            type: sessionStorage.getItem("type")
        }
    }

    logout = () =>{
        sessionStorage.removeItem("p_username");
        sessionStorage.removeItem("type")
        this.props.history.push('/');
    }

    DeleteApt = (id)=>{
        alert(id);
    }

    aptList=()=>{
        const list = this.state.apartment.map((apartment)=>
            <tr>
                <td>{apartment.apt} </td>
                <td>{apartment.street}</td>
                <td><button onClick={()=>this.DeleteApt(apartment.id)}>x</button></td>
            </tr>
        );
        return(
            <Table dark>
                <tr>
                <td>apt</td>
                <td>street</td>
                </tr>
            {list}</Table>
        )
    }

    componentDidMount(){
      
    }

    

    render() {
 
        const type = sessionStorage.getItem("type");
        console.log(type);
        const username = sessionStorage.getItem("p_username")
        if(type ===null&&username===null)
        {
            return(
                <div>
                    <h1>It's only access for house owner</h1>
                </div>
            )
        }
       else
       {
           if(this.state.type === types.Proprietor)
            {
                return (
                <div>
                   <ProDashboard/>
                </div>
                )
            }
            else if(this.state.type === types.Tenant)
            {
                return(
                    <div>
                        <TenDashboard/>
                    </div>
                )

            }
            else
            {
                return(
                    <div>
                    <h1>{this.state.type}Dasboard</h1>
                    {this.state.p_username}
                    <br/>
                    <button onClick={this.logout}>Logout</button>
                </div>
                )
            }
        

    }

    }
}




const mapStateToProps = (store) =>{
    return{
        p_username:store.proprietor.name
    }
}

export default connect(mapStateToProps)(P_Dasboard);
