import React, { Component } from 'react'
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
 
import Slide from '../WelcomePageSlide/WelcomePageSlide'
import PLOGIN from './Pro_Login_Conponent/Pro_Login_Conponent'

import "./WelcomePage.css"


export default class WelcomePage extends Component {


    PLoginCloseHandler = () =>{
        document.querySelector(".w_proprietor_login_backgroup").style.display= "none";
    }
    
    PLoginOpenHandler = () =>{
        document.querySelector(".w_proprietor_login_backgroup").style.display= "flex";
    }

    toggleHandler = () =>{
        alert("fdafsa")
    }



    render() {
        return (
            <div>
                <Slide/>
                <h1>
                    Welcome
                </h1>
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
                            <PLOGIN childTroggle={this.toggleHandler}/>
                        </div>
                    </div>
    
            </div>
        )
    }
}
