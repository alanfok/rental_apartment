import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import * as types from '../../type/type'

class P_Dasboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            p_username : localStorage.getItem("p_username"),
            type: localStorage.getItem("type")
        }
    }

    logout = () =>{
        localStorage.removeItem("p_username");
        this.props.history.push('/');
    }

    componentDidMount(){
      
    }


    render() {
        const type = localStorage.getItem("type")
        if(type ===null)
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
                    <h1>{this.state.type}Dasboard</h1>
                    {this.state.p_username}
                    <br/>
                    <button onClick={this.logout}>Logout</button>
                    <Link to="/porpritor/form"><button>Register Apartment</button></Link>
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
