import React, { Component } from 'react'
import {connect} from 'react-redux';

class P_Dasboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            p_username :""
        }
    }

    logout = () =>{
        localStorage.removeItem("p_username");
        this.props.history.push('/');
    }

    componentWillMount(){
        this.setState({p_username : this.props.p_username})
    }

    render() {
        //const v = localStorage.getItem("p_username");
        if(this.props.p_username ==="")
        {
            return(
                <div>
                    <h1>It's only access for house owner</h1>
                </div>
            )
        }
       else
       {
        return (
            <div>
                <h1>P_Dasboard</h1>
                
                <br/>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }

    }
}




const mapStateToProps = (store) =>{
    return{
        p_username:store.proprietor.name
    }
}

export default connect(mapStateToProps)(P_Dasboard);
