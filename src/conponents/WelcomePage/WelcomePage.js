import React, { Component } from 'react'
import {Button} from 'reactstrap'

import "./WelcomePage.css"

export default class WelcomePage extends Component {
    render() {
        return (
            <div>
                <h1>
                    Welcome
                </h1>
                    <Button className="w_button" href="/porpritor/welcome">Propertior</Button>
                    <Button  className="w_button">Talene</Button>



            </div>
        )
    }
}
