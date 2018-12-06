import React, { Component } from 'react';
import getUserInfo from './ClientAccountVirtualController'
import getLastCheckIn from './ClientAccountCheckInVirtualController.jsx'
import getPunchCard from './ClientAccountPunchVirtualController.jsx'
class ClientAccountContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: 'N/A',
            userInfo: undefined,
            last_check_in: undefined,
            punch: undefined,
        }

        this.onFinishUserInfo = this.onFinishUserInfo.bind(this);
        this.onFinishLastCI = this.onFinishLastCI.bind(this);
        this.onFinishPunch = this.onFinishPunch.bind(this);
    }

    componentDidMount() {
        const { userId } = this.props.location.state;

        this.setState({
            userId: userId,
        });

        getUserInfo(userId, this.onFinishUserInfo);
        getLastCheckIn(userId, this.onFinishLastCI);
        getPunchCard(userId, this.onFinishPunch);
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
        if(this.state.userInfo) {
            const { first_name, last_name, date_of_birth} = this.state.userInfo;
            const last_check_in = this.state.last_check_in;
            const userName = first_name + ' ' + last_name;
            const punch = this.state.punch;
            return(
                <div>
                    <h2>Client Account Page</h2>
                    <h3>Name: {userName}</h3>
                    <h3>Date of Birth: {date_of_birth}</h3>
                    <h3>Last Check-in: {last_check_in}</h3>
                    <h3>Punch Card Balance: {punch} </h3>
                </div>
            );
        }

        return (
            <div>
                <h2>Loading</h2>
            </div>
        );
    }
}

export default ClientAccountContainer;
