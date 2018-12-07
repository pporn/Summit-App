import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ClientListTypeahead from '../Shared/ClientListTypeahead.jsx';
import DOB from '../Shared/DobInput.jsx';
import { getClients, authUser } from './ClientAuthenticationVirtualController';


class ClientAuthentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submit: false,
            dob: null,
            dobCompleted: false,
            nameSelected: null,
            hasSelected: false,
            clients: null,
            userHasAuthenticated: null  // Init to null then true/false after submit
        }
        this.handleClientSelection = this.handleClientSelection.bind(this);
        this.handleClientDOB = this.handleClientDOB.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.setNewClients = this.setNewClients.bind(this);
        this.handleAuthUser = this.handleAuthUser.bind(this);
    }

    componentDidMount() {
        getClients(this.setNewClients);
    }

    setNewClients(newClients) {
        this.setState({
            clients: newClients,
        });
    }
    

    handleClientSelection(client) {
        this.setState({ 
            nameSelected: client,
            hasSelected: (client === "" ? false : true )
        })
    } 

    handleClientDOB(clientDob) {
        this.setState({ 
            dob: clientDob,
            dobCompleted: true
        });
    }

    handleAuthUser(payload) {
        if(payload.authenticated === false)
            this.setState({
                userHasAuthenticated: false
            })
        this.props.onAuthentication(payload);
    }

    onSubmit(e) {
        if(this.state.nameSelected === undefined)
            this.setState({ hasSelected: false })
        
        let payload = {
            name : this.state.nameSelected,
            dob  : this.state.dob,
            authenticated : false
        }
        payload = authUser(payload, this.handleAuthUser);

    }

    render() {
        return(
            <div id="Centralized-In-Page">
                <div id="Centralized-In-Block" className="Authenticatin-Div">
                <center>
                    {this.state.clients != null &&
                        <h2>Enter Your Name</h2>
                    }
                    <ClientListTypeahead 
                        clientList={this.state.clients} 
                        onSelect={this.handleClientSelection}
                    />
                    {
                        this.state.hasSelected
                            ?   <div id="Top-Padding">
                                    <h5>Enter your DOB</h5>
                                    <span>
                                        <DOB defaultDate={"2000-01-01"} onValidDOB={this.handleClientDOB}/>
                                        {
                                            (this.state.userHasAuthenticated !== null && this.state.userHasAuthenticated === false)
                                                ?   <span className="Failed-Authentication-Div" color="red">Failed Authentication...</span>
                                                :   null
                                        }
                                    </span>
                                </div>
                            : null
                    }
                    {
                        this.state.dobCompleted
                            ?   <div id="Top-Padding">
                                    <Button 
                                        bsStyle="primary" 
                                        disabled={!this.state.hasSelected} 
                                        onClick={this.onSubmit}>
                                        Submit
                                    </Button>
                                </div>
                            : null
                    }
                </center>
                </div>
            </div>
        )
    }
}

export default ClientAuthentication;
