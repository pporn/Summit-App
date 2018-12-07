import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class AlertManagementContainer extends Component {
    render() {
        return(
            <div id='Centralized-In-Page'>
                <ButtonToolbar>
                    <ButtonGroup className='btn-group-vertical'>
                        <Link to='/CreateAlert' id='Centralized-In-Block'>
                            <Button bsStyle='primary' bsSize='large' id='Centralized-In-Block'>
                                Create Alert
                            </Button>
                        </Link>

                        <Link to='/ManageAlert' id='Centralized-In-Block'>
                            <Button bsStyle='primary' bsSize='large'>
                                Manage Alert
                            </Button>
                        </Link>
                    </ButtonGroup>
                </ButtonToolbar>
        </div>
        )
    }
}

export default AlertManagementContainer;
