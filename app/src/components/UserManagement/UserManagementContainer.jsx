import React from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserManagementContainer() {
    return (
        <div id='Centralized-In-Page'>
            <ButtonToolbar>
                <ButtonGroup className='btn-group-vertical'>
                    <Link to='/DeleteUser' id='Centralized-In-Block'>
                        <Button bsStyle='primary' bsSize='large' id='Centralized-In-Block'>
                            Delete User
                        </Button>
                    </Link>

                    <Link to='/ViewUserInfo' id='Centralized-In-Block'>
                        <Button bsStyle='primary' bsSize='large'>
                            View User Info
                        </Button>
                    </Link>

                    <Link to='/RefillPunchCards' id='Centralized-In-Block'>
                        <Button bsStyle='primary' bsSize='large'>
                            Refill Punch Cards
                        </Button>
                    </Link>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    );
}

export default UserManagementContainer;
