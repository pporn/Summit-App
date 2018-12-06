import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { verifyName } from '../Shared/Utils.js';
import DOB from '../Shared/DobInput';
import getUserInfo from './ViewUserInfoVirtualController';
import UserInfoPage from './UserInfoPage';

class ViewUserInfoContainer extends Component {
    constructor(props) {
        super(props);

        // states
        this.state = {
            firstName: '',
            lastName: '',
            dob: null,
            dobCompleted: false,
            userInfo: undefined,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClientDOB = this.handleClientDOB.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameCheck = this.nameCheck.bind(this);
        this.onGetUserInfo = this.onGetUserInfo.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
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

        const validNameCheck = this.nameCheck();

        if(validNameCheck.validName === true){
            this.setState({ isNameValid: true});

            const payload = {
                firstName : validNameCheck.firstName,
                lastName  : validNameCheck.lastName,
                dob       : this.state.dob,
            };

            getUserInfo(payload, this.onGetUserInfo);
        }
        else{
            this.setState({ isNameValid: false });
        }
    }

    onGetUserInfo(isSuccess, payload) {
        if(isSuccess) {
            console.log(payload);
            this.setState({
                userInfo: payload,
            })
        } else {
            // get error
            const { error } = payload;

            alert(error);
        }
    }

    fetchUserInfo() {
        return this.state.userInfo;
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
            {this.state.userInfo === undefined &&
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

                    {this.state.dobCompleted &&
                    <Button
                        bsStyle='primary'
                        form='form1'
                        type='submit'
                    >
                        View User Info
                    </Button>
                    }
                </form>
            }
            {this.state.userInfo &&
                <UserInfoPage getUserInfo={this.fetchUserInfo} />
            }
            </div>
        );
    }
}

export default ViewUserInfoContainer;
