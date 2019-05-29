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
            toggle: false,
            width: window.innerWidth,
            b_pLogin: "w_proprietor_login_backgroup"
        }
    }

    PLoginCloseHandler = () =>{
        this.setState({toggle: false})
        document.querySelector(".w_proprietor_login_backgroup").style.display= "none";
        if(this.state.width>1225){
        document.querySelector(".w_proprietor_login_content").style.height ="20%"
        }
    }
    
    PLoginOpenHandler = () =>{
        document.querySelector(".w_proprietor_login_backgroup").style.display= "flex";
    }

    toggleHandler = () =>{
        var v = this.state.toggle
        this.setState({toggle: !v})
        if(!this.state.toggle)
        {
            if(this.state.width>1225)
            {
            document.querySelector(".w_proprietor_login_content").style.height ="30%"
            }
        }
        else
        {
            if(this.state.width>1225)
            {
            document.querySelector(".w_proprietor_login_content").style.height ="20%"
            }
        }
    }



    reSizeHandler = () =>
    {
        this.setState({width: window.innerWidth});
    }

    componentWillMount()
    {
        window.addEventListener('resize',this.reSizeHandler);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.reSizeHandler);
      }

    render() {
        var {width} = this.state;


        return (
            <div>
                <Slide/>
                <div className="w_button_group">
                    <button className="w_button" onClick={this.PLoginOpenHandler}>Looking for client...</button>
                    {/*
                    <Link to="/porpritor/welcome"><button className="w_button" >Looking for client...</button></Link>
                    */
                    }
                    <Link to="/"><button className="w_button">Looking for apartment...</button></Link>
                    
                    { 
                        /** p_login conpontent*/}

                    {
                        
                    <div className="w_proprietor_login_backgroup">
                        <div className={(this.state.width>1225)?"w_proprietor_login_content":"w_proprietor_login_content_2"}>
                            <p className="w_proprietor_close" onClick={this.PLoginCloseHandler}>+</p>
                            {(this.state.toggle)?<PSINGUP/>:<PLOGIN childTroggle={this.toggleHandler}/>}
                        </div>
                    </div>
                    }
                </div>
                    

    
            </div>
        )
    }
}

export default WelcomePage;