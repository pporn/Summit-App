import React, { Component } from 'react';
import { setMedicalQuestionnaire } from './MedicalQuestionnaireVirtualController'
import { Redirect } from 'react-router-dom';

class MedicalQuestionnaire extends Component {
    constructor (props) {
        super(props);

        // state info
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            hasIllness: '',
            takingMedications: '',
            lastCheckup: '',
            isSubmitted: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    handleChange ({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        console.log(this.state);

        setMedicalQuestionnaire(this.state, this.onFinish);
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
                First Name <br/>
                <input name = "firstName" type="textarea" value={this.state.firstName} onChange={this.handleChange} />
                <br/>

                Last Name <br/>
                <input name = "lastName" type="textarea" value={this.state.lastName} onChange={this.handleChange} />
                <br/>

                Date of Birth <br/>
                <input name = "dob" type="date" value={this.state.dob} onChange={this.handleChange}/>
                <br/>

                Are you currently being or have been in the past year treated for a medical condition?<br/>
                <textarea name = "hasIllness" type="textarea" rows="4" value={this.state.hasIllness} onChange={this.handleChange}
                    id="MedQuesConditions"/>
                <br/>

                Are you currently taking any medications?<br/>
                <textarea name = "takingMedications" type="textarea" value={this.state.takingMedications} onChange={this.handleChange}/>
                <br/>

                When was your last checkup? <br/>
                <input name = "lastCheckup" type="date" value={this.state.lastCheckup} onChange={this.handleChange}/>
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
