import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { verifyName } from '../Shared/Utils.js';
import DOB from '../Shared/DobInput';
import refillPunchCards from './RefillPunchCardsVirtualController';

class RefillPunchCardsContainer extends Component {
    constructor(props) {
        super(props);

        // states
        this.state = {
            firstName: '',
            lastName: '',
            dob: null,
            dobCompleted: false,
            refillAmount: 0,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClientDOB = this.handleClientDOB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameCheck = this.nameCheck.bind(this);
        this.onRefilled = this.onRefilled.bind(this);
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleClientDOB(clientDob) {
        this.setState({
            dob: clientDob,
            dobCompleted: true
        });
    }

    handleSubmit(event) {
        // prevent default operation
        event.preventDefault();

        // pop up confirmation
        const retVal = window.confirm("Do you want to continue?");

        // quit unintended operation
        if(!retVal) {
            return;
        }

        const validNameCheck = this.nameCheck();

        if(validNameCheck.validName === true && this.state.refillAmount > 0){
            this.setState({ isNameValid: true});

            const payload = {
                firstName : validNameCheck.firstName,
                lastName  : validNameCheck.lastName,
                dob       : this.state.dob,
                refillAmount : parseInt(this.state.refillAmount),
            };

            refillPunchCards(payload, this.onRefilled);
        }
        else{
            alert('Invalid name')
            this.setState({ isNameValid: false });
        }
    }

    onRefilled(result, { error }) {
        if(result) {
            alert('Successfully refilled');
        } else {
            alert(error);
        }
    }

    nameCheck(){
        //Check for invalid characters and remove whitespace
        var fName = verifyName(this.state.firstName);
        var lName = verifyName(this.state.lastName);

        if(fName === "" || lName === "") {
            return { validName: false };
        } else {
            return { firstName:fName, lastName:lName, validName: true };
        }
    }

    render() {
        return(
            <div className='Centralized-In-Block'>
                <form id='form1' onSubmit={this.handleSubmit}>
                    First Name:
                    <input name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange} />
                    <br />

                    Last Name:
                    <input name='lastName' type='text' value={this.state.lastName} onChange={this.handleChange} />
                    <br />

                    Date of birth:
                    <DOB onValidDOB={this.handleClientDOB}/>
                    <br />

                    Refill Amount:
                    <input name='refillAmount' type='text' value={this.state.newPunchCard} onChange={this.handleChange} />
                    <br />

                    {this.state.dobCompleted && this.state.refillAmount > 0 &&
                    <Button
                        bsStyle='primary'
                        form='form1'
                        type='submit'
                    >
                        Add Punch Card
                    </Button>
                    }
                </form>
            </div>
        );
    }
}

export default RefillPunchCardsContainer;
