import React, { Component } from 'react'
import {Button} from 'reactstrap'

import Slide from '../WelcomePageSlide/WelcomePageSlide'


import "./WelcomePage.css"
import { S } from 'xmlchars/xml/1.0/ed5';

export default class WelcomePage extends Component {
    render() {
        return (
            <div>
                <Slide/>
                    <Button className="w_button" href="/porpritor/welcome">Propertior</Button>
                    <Button  className="w_button">Talene</Button>



            </div>
        )
    }
}
