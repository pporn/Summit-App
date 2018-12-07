import React, { Component } from 'react';

class UserInfoPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: props.getUserInfo(),
        }
    }

    render() {
        const { 
            first_name,
            last_name,
//            check_in,
            date_of_birth,
            last_check_in,
            punch_card,
//            medical_info,
        } = this.state.userInfo;

        const lastCheckIn = new Date(last_check_in);

        return (
            <div>
                First Name: {first_name}
                <br />

                Last Name: {last_name}
                <br />

                Date of Birth: {date_of_birth}
                <br />

                Punch Card Left: {punch_card}
                <br />

                Last Check In Time: {lastCheckIn.toLocaleString('en-US')}
            </div>
        );
    }
}

export default UserInfoPage;
