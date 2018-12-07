import React, { Component } from 'react';
import { createAlert } from './CreateAlertVirtualController';

class CreateAlertContainer extends Component {
    constructor() {
        super();

        const currDate = new Date();
        console.log(currDate.toLocaleString());

        // state info
        this.state = {
            name: '',
            start_date_str: this.getDateTimeFormat(currDate),
            end_date_str: this.getDateTimeFormat(currDate),
            description: '',
            is_created: false,
        }

        // bind all functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onFinishAlertCreation = this.onFinishAlertCreation.bind(this);
    };

    formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    getDateTimeFormat(date) {
        const year = date.getFullYear();
        const month = this.formatTime(date.getMonth() + 1);
        const day = this.formatTime(date.getDate());

        const hour = this.formatTime(date.getHours());
        const minute = this.formatTime(date.getMinutes());

        return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit (event) {
        event.preventDefault();

        const {name, description, start_date_str, end_date_str} = this.state;
        const startDate = new Date(start_date_str);
        const endDate = new Date(end_date_str);

        // Check start date
        if(isNaN(startDate.getTime())) {
            alert('invalid start date');

            return;
        }
        // Check end date
        if(isNaN(endDate.getTime())) {
            alert('invalid end date');

            return;
        }
        // Check start and end date
        if(startDate > endDate) {
            alert('end date is smaller than start date');

            return;
        }

        const payload = {
            name: name,
            description: description,
            start_date: startDate.getTime(),
            end_date: endDate.getTime(),
        };

        createAlert(payload, this.onFinishAlertCreation);
    }

    onFinishAlertCreation(isSuccessful) {
        if(isSuccessful) {
            // change stae
            this.setState({
                is_created: true,
            });
            alert('alert created');
        } else {
            alert('failed to create alert');
        }
    }

    render() {
        return(
            <div>
                <h3>Enter name of alert:</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter name of alert:"
                    value={ this.state.name }
                    onChange={ this.handleChange }
                />

                <h3>Enter start date:</h3>
                <input
                    type="datetime-local"
                    name="start_date_str"
                    placeholder="Enter start date:"
                    value={ this.state.start_date_str}
                    onChange={ this.handleChange }
                />

                <h3>Enter end date:</h3>
                <input
                    type="datetime-local"
                    name="end_date_str"
                    placeholder="Enter end date:"
                    value={ this.state.end_date_str}
                    onChange={ this.handleChange }
                />

                <h3>Enter description:</h3>
                <input
                    type="text"
                    name="description"
                    placeholder="Enter description:"
                    value={ this.state.description }
                    onChange={ this.handleChange }
                />

                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </div>
        );
    }
}

export default CreateAlertContainer;
