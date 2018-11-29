import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar } from 'react-bootstrap';

class ContinueToAccount extends Component {
    render() {
            const userId = this.props.userId;
            return(
                this.props.showQuestion
                    ?   <div>
                            <center><h3>Hi {this.props.name}! Would you like to continue to your account?</h3></center>
                            <div id="Centralized-In-Page">
                                <ButtonToolbar className="btn-group-vertical">
                                    <span id="Centralized-In-Block">
                                        <Link to={{
                                                pathname: '/ClientAccount',
                                                state: {
                                                    userId: userId,
                                                },
                                            }}>
                                            <Button bsStyle="primary">Yes</Button>
                                        </Link>
                                    </span>
                                    <span id="Centralized-In-Block">
                                        <Link to='/Home'>
                                            <Button bsStyle="primary">No</Button>
                                        </Link>
                                    </span>
                                </ButtonToolbar>
                            </div>
                        </div>
                    : null

            )
        
    }
}
export default ContinueToAccount;
