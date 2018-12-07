import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import getUserInfo from './ClientAccountVirtualController';
import getLastCheckIn from './ClientAccountCheckInVirtualController';
import getPunchCard from './ClientAccountPunchVirtualController';
import getActiveAlerts from './ActiveAlertsVirtualController';

class ClientAccountContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: 'N/A',
            userInfo: undefined,
            last_check_in: undefined,
            punch: undefined,
            active_alerts: undefined,
        }

        this.onFinishUserInfo = this.onFinishUserInfo.bind(this);
        this.onFinishLastCI = this.onFinishLastCI.bind(this);
        this.onFinishPunch = this.onFinishPunch.bind(this);
        this.onActiveAlerts = this.onActiveAlerts.bind(this);
    }

    componentDidMount() {
        const { userId } = this.props.location.state;

        this.setState({
            userId: userId,
        });

        getUserInfo(userId, this.onFinishUserInfo);
        getLastCheckIn(userId, this.onFinishLastCI);
        getPunchCard(userId, this.onFinishPunch);
        getActiveAlerts(this.onActiveAlerts);
    }

    onActiveAlerts(isSuccess, payload) {
        if(isSuccess) {
            this.setState({
                active_alerts: payload,
            })
        }
    }

    onFinishUserInfo(userInfo) {
        this.setState({
            userInfo: userInfo,
        });
    }

    onFinishLastCI(checkInInfo) {
        this.setState({
            last_check_in : checkInInfo,
        });
    }
    onFinishPunch(punchTime){
       this.setState({
        punch : punchTime,
       });
    }
    render() {
        let last_check_in;
        let userName;
        let punch;
        let date_of_birth;

        if(this.state.userInfo) {
            const { first_name, last_name } = this.state.userInfo;
            last_check_in = new Date(this.state.last_check_in).toLocaleString();
            userName = first_name + ' ' + last_name;
            punch = this.state.punch;
            date_of_birth = this.state.userInfo.date_of_birth;
        }

        const { active_alerts } = this.state;

        return (

            <div>
                {active_alerts &&
                    active_alerts.map(alert => (
                        <Alert bsStyle='danger' key={alert.id}>{alert.name}: {alert.description}</Alert>
                    ))
                }
                {!this.state.userInfo &&
                <h2>Loading</h2>
                }
                {this.state.userInfo &&
                <div>
                    <h2>Client Account Page</h2>
                    <h3>Name: {userName}</h3>
                    <h3>Date of Birth: {date_of_birth}</h3>
                    <h3>Last Check-in: {last_check_in}</h3>
                    <h3>Punch Card Balance: {punch} </h3>
                </div>
                }
            </div>
        );
    }
}

export default ClientAccountContainer;

