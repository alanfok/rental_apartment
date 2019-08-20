import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Table,Input,Button} from 'reactstrap'
import {Redirect} from 'react-router-dom';


import axios from 'axios'

import "./Ten_Dashboard.css";
import { Buffer } from 'buffer';



export default class Ten_Dashboard extends Component {

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

    }

    logout = () =>{
        sessionStorage.removeItem("p_username");
        sessionStorage.removeItem("type")
        this.setState({logout: true})
       // this.props.history.push('/');
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
                                <Input type="select">                              
                                <option value = "Montreal"  >Montreal</option>
                                <option value = "Winnipeg"  >Winnipeg</option>
                                <option value = "Toronto"   >Toronto</option>
                                <option value = "Vancouver" >Vancouver</option>
                                <option value = "Halifax"   >Halifax</option></Input>
                            </td>
                            <td>
                                <Button>Search</Button>
                            </td>
                        </tr>
                    </table>
                    </div>           
                    <br/>
                    <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}