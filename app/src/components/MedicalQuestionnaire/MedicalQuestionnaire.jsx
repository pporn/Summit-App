import React, { Component } from 'react';
import { setMedicalQuestionnaire } from './MedicalQuestionnaireVirtualController'
import { Redirect } from 'react-router-dom';
import DOB from '../Shared/DobInput.jsx';

class MedicalQuestionnaire extends Component {
    constructor (props) {
        super(props);

        // state info
        this.state = {
            firstName: this.props.location.state.firstName,
            lastName: this.props.location.state.lastName,
            dob: this.props.location.state.dob,
            hasIllness: '',
            takingMedications: '',
            lastCheckup: '',
            isSubmitted: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.handleDob = this.handleDob.bind(this);
    }

    handleChange ({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        setMedicalQuestionnaire(this.state, this.onFinish);
    }

    handleDob(dob) {
        this.setState({ dob: dob });
    }

    onFinish(isSuccessful) {
        this.setState({
            isSubmitted: isSuccessful,
        });
    }

    render() {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
                Are you currently being or have been in the past year treated for a medical condition?<br/>
                <textarea name = "hasIllness" type="textarea" rows="4" value={this.state.hasIllness} onChange={this.handleChange}
                    id="MedQuesConditions"/>
                <br/>

                Are you currently taking any medications?<br/>
                <textarea name = "takingMedications" type="textarea" value={this.state.takingMedications} onChange={this.handleChange}
                    id="MedQuesConditions"/>
                <br/>

                When was your last checkup? <br/>
                <DOB onValidDOB={this.handleDob}/>

                <br/>

                <input type="submit" value="Submit"/>
            </form>
            {this.state.isSubmitted &&
                <Redirect
                    to={{
                        pathname: "/HowToUseApp",
                    }} />
            }
        </div>
      );
    }
}

export default MedicalQuestionnaire;
