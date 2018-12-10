import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import getClockInAndOut from './EmployeeClockInAndOutVirtualController';
import ClockInAndOut from './ClockInAndOut/ClockInAndOut';

class EmployeeClockInContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isAuthed: false,
            clockIn: undefined,
            clockOut: undefined,
            isClockedIn: undefined,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.processRecievedData = this.processRecievedData.bind(this);
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    processRecievedData(isSuccess, payload) {
        if(!isSuccess) {
            alert(payload.error);
        }

        this.setState({
            isAuthed: true,
            clockIn: payload.clock_in,
            clockOut: payload.clock_out,
            isClockedIn: payload.is_clocked_in,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { email, password } = this.state;

        const payload = {
            email: email,
            password: password,
        };

        getClockInAndOut(payload, this.processRecievedData);
    }

    render() {
        const { isAuthed, clockIn, clockOut } = this.state;
        const clockInAndOut = [];

        if(isAuthed) {
            Object.keys(clockIn).forEach((val) => {
                clockInAndOut.push({ key: val,clockIn: clockIn[val] });
            });

            let i = 0;

            Object.keys(clockOut).forEach((val) => {
                clockInAndOut[i].clockOut = clockOut[val];

                i += 1;
            });
        }

        return(
            <div>
            {!isAuthed &&
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
                        View Clock In and Out
                    </Button>
                </form>
            }
            {isAuthed &&
                clockInAndOut.map((entry) => (
                    <ClockInAndOut key={entry.key} clockInAndOut={entry} />
                ))
            }
            </div>
        );
    }
}

export default EmployeeClockInContainer;
