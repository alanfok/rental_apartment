import React, { Component } from 'react'
import {Button} from 'reactstrap'

import './P_Welcome.css'

export default class P_Welcome extends Component {
    render() {
        return (
            <div>
                <h1>
                    Welcome Proprietor
                </h1>
                <Button className="pw_button" href="/porpritor/form">Register</Button>
            </div>
        )
    }
}
