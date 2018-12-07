import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import deleteAlert from './AlertVirtualController';

class Alert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.alertId,
            name: props.name,
            description: props.description,
            startDate: props.startDate,
            endDate: props.endDate,
        };

        this.deleteAlert = this.deleteAlert.bind(this);
        this.onDeleted = this.onDeleted.bind(this);
    }

    deleteAlert() {
        const { id } = this.state;

        if(window.confirm("Delete it?")) {
            deleteAlert(id, this.onDeleted);
        }
    }

    onDeleted(isSuccess, payload) {
        if(isSuccess) {
            alert('deleted');
        } else {
            alert(payload.error);
        }

        window.location = '/ManageAlert';
    }

    render() {
        const {name, description, startDate, endDate} = this.state;

        return (
            <div>
                <h3> {name} </h3>
                <p>start date: {new Date(startDate).toLocaleString()}</p>
                <p>end date: {new Date(endDate).toLocaleString()}</p>
                <p>{description}</p>
                <Button bsStyle='primary' onClick={this.deleteAlert}>Delete</Button>
            </div>
        );
    }
}

export default Alert;
