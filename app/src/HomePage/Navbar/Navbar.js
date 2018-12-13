import React from 'react';
import { Toolbar, Button } from 'react-onsenui';

function Navbar() {
  return (
    <Toolbar>
      {/* Left part is going to be user creation page */}
      <div className="left">
        <Button modifier="quiet">New User</Button>
      </div>

      {/* App Name */}
      <div className="center">Summit-App</div>

      {/* Employee Login */}
      <div className="right">
        <Button modifier="quiet">Employee</Button>
      </div>
    </Toolbar>
  );
}

export default Navbar;
