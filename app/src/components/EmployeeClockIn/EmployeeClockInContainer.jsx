import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import clockIn from './EmployeeClockInVirtualController';

class EmployeeClockInContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onClockedIn = this.onClockedIn.bind(this);
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const payload = {
            email: this.state.email,
            password: this.state.password,
        };

        clockIn(payload, this.onClockedIn);
    }

    onClockedIn(isSuccess, payload) {
        if(isSuccess) {
            alert('Successfully clocked in');
        } else {
            alert(payload.error);
        }

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
                        Clock In
                    </Button>
                </form>

            </div>
        );
    }
}

export default EmployeeClockInContainer;
