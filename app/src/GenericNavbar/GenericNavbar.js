import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, BackButton } from 'react-onsenui';

function GenericNavbar({ title, navigator }) {
  return (
    <Toolbar>
      <div className="left">
        <BackButton onClick={() => navigator.popPage()}>Back</BackButton>
      </div>

      <div className="center">
        {title}
      </div>

    </Toolbar>
  );
}

GenericNavbar.defaultProps = {
  title: null,
};

GenericNavbar.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default GenericNavbar;
