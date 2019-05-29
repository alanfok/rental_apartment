import React, { Component } from 'react'
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
 
import Slide from '../WelcomePageSlide/WelcomePageSlide'
import PLOGIN from './Pro_Login_Conponent/Pro_Login_Conponent'
import PSINGUP from './Pro_Signup_Conponent/Pro_Signup_Conponent';

import "./WelcomePage.css"



class WelcomePage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            toggle: false
        }
    }

    PLoginCloseHandler = () =>{
        this.setState({toggle: false})
        document.querySelector(".w_proprietor_login_backgroup").style.display= "none";
        document.querySelector(".w_proprietor_login_content").style.height ="20%"
    }
    
    PLoginOpenHandler = () =>{
        document.querySelector(".w_proprietor_login_backgroup").style.display= "flex";
    }

    toggleHandler = () =>{
        var v = this.state.toggle
        this.setState({toggle: !v})
        if(!this.state.toggle)
        {
            document.querySelector(".w_proprietor_login_content").style.height ="30%"
        }
        else
        {
            document.querySelector(".w_proprietor_login_content").style.height ="20%"
        }
    }



    render() {
        return (
            <div>
                <Slide/>

                <h1>
                    Welcome
                </h1>
                <div className="w_button_group">
                    <button className="w_button" onClick={this.PLoginOpenHandler}>Looking for client...</button>
                    {/*
                    <Link to="/porpritor/welcome"><button className="w_button" >Looking for client...</button></Link>
                    */
                    }
                    <Link to="/"><button className="w_button">Looking for apartment...</button></Link>
                    
                    {/** p_login conpontent*/}
                    <div className="w_proprietor_login_backgroup">
                        <div className="w_proprietor_login_content">
                            <p className="w_proprietor_close" onClick={this.PLoginCloseHandler}>+</p>
                            {(this.state.toggle)?<PSINGUP/>:<PLOGIN childTroggle={this.toggleHandler}/>}
                        </div>
                    </div>
                </div>
    
            </div>
        )
    }
}

export default WelcomePage;