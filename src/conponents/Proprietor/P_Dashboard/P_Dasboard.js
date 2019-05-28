import React, { Component } from 'react'
import {connect} from 'react-redux';

class P_Dasboard extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render() {
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
                {this.props.p_username}
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
