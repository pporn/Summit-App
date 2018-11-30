import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class MainMenu extends Component {
    render() {
        return(
            <div id="Centralized-In-Page">
                <ButtonToolbar>
                    <ButtonGroup className="btn-group-vertical">
                        <Link to='/CheckIn' id="Centralized-In-Block">
                            <Button bsSize="large" bsStyle="primary">Check In</Button>
                        </Link>
                        <Link to='/Login' id="Centralized-In-Block">
                            <Button bsSize="large" bsStyle="primary">Login</Button>
                        </Link>
                        <Link to='/ClientRegistration' id="Centralized-In-Block">
                            <Button bsSize="large" bsStyle="primary">New User</Button>
                        </Link>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        )
    }
}
export default MainMenu;
