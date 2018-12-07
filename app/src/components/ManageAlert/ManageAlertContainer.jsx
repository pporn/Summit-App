import React, { Component } from 'react';
import Alert from './Alert/Alert';
import getAllAlerts from './ManageAlertVirtualController';

class ManageAlertContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alerts: undefined,
        };

        this.onGetAllAlerts = this.onGetAllAlerts.bind(this);
    }

    componentDidMount() {
        getAllAlerts(this.onGetAllAlerts);
    }

    onGetAllAlerts(isSuccess, payload) {
        if(isSuccess) {
            this.setState({
                alerts: payload,
            })
        } else {
            alert(payload.error);
        }
    }

    render() {
        const { alerts } = this.state;
        console.log(alerts);

        return(
            <div>
                {!alerts &&
                    <div>
                        Loading
                    </div>
                }
                {alerts &&
                    alerts.map((alert) => 
                        <Alert
                            key={alert.id}
                            name={alert.name}
                            description={alert.description}
                            startDate={alert.start_date}
                            endDate={alert.end_date}
                            alertId={alert.id}
                        />
                    )
                }
            </div>
        );
    }
}

export default ManageAlertContainer;
