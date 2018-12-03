import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import authEmployee from './EmployeeAuthenticationVirtualController';

class EmployeeAuthenticationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onAuthenticated = this.onAuthenticated.bind(this);
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);

        const payload = {
            email: this.state.email,
            password: this.state.password,
        };

        authEmployee(payload, this.onAuthenticated);
    }

    onAuthenticated(payload) {
        if(!payload.authenticated) {
            alert(payload.error.message);

            return;
        }

        alert('logged in!');

        return;
    }

    render() {
        return(
            <div>
                <form id='form1' onSubmit={this.handleSubmit}>
                    Email:
                    <input name='email' value={this.state.email} onChange={this.handleChange} />
                    <br />

                    Password:
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange} />
                    <br />

                    <Button
                        bsStyle='primary'
                        type='submit'
                        form='form1'
                    >
                        Log In
                    </Button>
                </form>
            </div>
        );
    }
}

export default EmployeeAuthenticationContainer;
