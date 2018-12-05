import React, { Component } from 'react';
import ClientAuthentication from '../ClientAuthentication/ClientAuthentication.jsx';
import ContinueToAccountQuestion from '../ClientAuthentication/ContinueToAccount.jsx';
import { getClients, checkIn } from './ClientCheckInVirtualController';
import DateError from './DateError.jsx'
import PasswordError from './PasswordError.jsx'

class ClientCheckIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clients: null,
            clientName: "",
            showContinueQuestion: false,
            invalidDate: false,
            invalidPassword: false,
        }

        this.onAuthentication = this.onAuthentication.bind(this);
        this.setNewClients = this.setNewClients.bind(this);
        this.onUserCheckedIn = this.onUserCheckedIn.bind(this);
    }

    onAuthentication(payload) {

        if (payload.dob > (new Date().toISOString().split('T')[0])) {
            this.setState({
                invalidPassword: false,
                invalidDate: true
            });
        }
        else{
            this.setState({
                invalidDate: false
            });
        }

        if(payload.authenticated) {
            this.setState({
                clientName: payload.name,
                invalidDate: false,
                invalidPassword: false,
                userId: payload.userId,
            });

            // after authenticated, we neet to actually check user in
            checkIn(payload.userId, this.onUserCheckedIn);
        }
        else {
            this.setState({
                invalidPassword: true
            });
        }
    }

    onUserCheckedIn(isSuccess, payload) {
        if(isSuccess) {
            this.setState({
                showContinueQuestion: true,
            });
        } else {
            alert(payload.message);
        }
    }

    setNewClients(newClients) {
        this.setState({
            clients: newClients,
        });
    }

    componentDidMount() {
        getClients(this.setNewClients);
    }

    render() {
        return(
            <div>
                { (!this.state.showContinueQuestion)
                    ?
                        <div>
                            <ClientAuthentication clients={this.state.clients} onAuthentication={this.onAuthentication}/>
                            <DateError showError={this.state.invalidDate}/>
                            <PasswordError showError={this.state.invalidPassword}/>
                        </div>
                    :
                        <div id="Centralized-In-Page">
                            <ContinueToAccountQuestion showQuestion={this.state.showContinueQuestion} name={this.state.clientName} test={true} userId={this.state.userId}/>
                        </div>
                }
            </div>
        );
    }
}

export default ClientCheckIn;
