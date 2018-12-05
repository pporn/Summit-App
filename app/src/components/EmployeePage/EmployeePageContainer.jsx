import React, { Component } from 'react';
import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class EmployeePageContainer extends Component {
    render() {
        return(
            <div id='Centralized-In-Page'>
                <ButtonToolbar>
                    <ButtonGroup className='btn-group-vertical'>
                        <Link to='/AlertManagement' id='Centralized-In-Block'>
                            <Button bsStyle='primary'>Alert Management</Button>
                        </Link>
                        <Link to='/UserManagement' id='Centralized-In-Block'>
                            <Button bsStyle='primary'>User Management</Button>
                        </Link>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        )
    }
}
export default EmployeePageContainer;
