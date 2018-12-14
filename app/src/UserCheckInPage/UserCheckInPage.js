import React from 'react';
import { Page } from 'react-onsenui';
import PropTypes from 'prop-types';

import Navbar from '../GenericNavbar/GenericNavbar';

function renderToolbar(navigator) {
  return (
    <Navbar navigator={navigator} title="Check In" />
  );
}

function UserCheckInPage({ navigator }) {
  return (
    <Page renderToolbar={() => renderToolbar(navigator)}>
      <p>Under Construction</p>
    </Page>
  );
}

UserCheckInPage.propTypes = {
  navigator: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default UserCheckInPage;
