import React, { Component } from 'react'
import {Button,Spinner} from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as type from '../../type/type'
 
import Slide from '../WelcomePageSlide/WelcomePageSlide'
import PLOGIN from './Pro_Login_Conponent/Pro_Login_Conponent'
import PSINGUP from './Pro_Signup_Conponent/Pro_Signup_Conponent';
import CLOGIN from './Pro_Login_Conponent/Pro_Login_Conponent'
import CSINGUP from './Pro_Signup_Conponent/Pro_Signup_Conponent';

import "./WelcomePage.css"


class WelcomePage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            toggle: false,
            width: window.innerWidth,
            isLookforApartment:false,
            photolooding: true
        }
    }

    PLoginCloseHandler = () =>{
        this.setState({isLookforApartment:false})
        this.setState({toggle: false})
        document.querySelector(".w_proprietor_login_backgroup").style.display= "none";
    }
    
    PLoginOpenHandler = () =>{
        document.querySelector(".w_proprietor_login_backgroup").style.height= `${this.state.height}px`;
        document.querySelector(".w_proprietor_login_backgroup").style.display= "flex";
    }

    CLoginOpenHandler = () =>{
        this.setState({isLookforApartment: true})
        document.querySelector(".w_proprietor_login_backgroup").style.height= `${this.state.height}px`;
        document.querySelector(".w_proprietor_login_backgroup").style.display= "flex";
    }

    toggleHandler = () =>{
        var v = this.state.toggle
        this.setState({toggle: !v})
    }



    reSizeHandler = () =>
    {
        this.setState({width: window.innerWidth});
    }

    componentWillMount()
    {
        window.addEventListener('resize',this.reSizeHandler);
        
    }
    
    componentWillUnmount() 
    {
        window.removeEventListener('resize', this.reSizeHandler);
    }

    render() {
        if(!this.props.welcomeslide)
        {
            return(
                <div>
                    <Slide></Slide>
                </div>
                )
        }
        else
        {
        return (
            <div>
                <Slide/>
                <div className="w_button_group">
                    <button className="w_button" onClick={this.PLoginOpenHandler}>Looking for client...</button>
                    <button className="w_button" onClick={this.CLoginOpenHandler}>Looking for apartment...</button>            
                    { /** p_login conpontent*/}
                    <div className="w_proprietor_login_backgroup">
                           <div className={(this.state.width>1225)?"w_proprietor_login_content":"w_proprietor_login_content_2"}>
                            <p className="w_proprietor_close" onClick={this.PLoginCloseHandler}>+</p>
                            {(this.state.isLookforApartment)?                        
                            <div>{/* login in for look for appartment */}
                                 {(this.state.toggle)?<CSINGUP name={type.Tenant}/>:<CLOGIN name={type.Tenant} childTroggle={this.toggleHandler}/>}
                            </div>
                            :
                            <div>{/* login in for look for client */}
                            {(this.state.toggle)?<PSINGUP name={type.Proprietor}/>:<PLOGIN name={type.Proprietor} childTroggle={this.toggleHandler}/>}
                            </div>
                            }
                        </div>
                    </div>
                </div>  
            </div>
        )
                        }
    }
}


const mapStateToProps = store =>{
    return {
        welcomeslide : store.welcome.isPhotoFinishLoading
    }
}

export default connect (mapStateToProps) (WelcomePage);