import React, { Component } from 'react';
import {
  Page,
  List,
  ListItem,
} from 'react-onsenui';
import Navbar from './Navbar/Navbar';

function renderRow(data, index) {
  return (
    <ListItem modifier="tappable" key={index}>
      {data}
    </ListItem>
  );
}

function renderToolbar() {
  return <Navbar />;
}

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableFunctions: [
        'Check In',
        'Log In',
        'Gym Information',
      ],
    };
  }

  render() {
    const { availableFunctions } = this.state;

    return (
      <div>
        {/* Body */}
        <Page renderToolbar={renderToolbar}>
          <List
            dataSource={availableFunctions}
            renderRow={renderRow}
          />
        </Page>
      </div>
    );
  }
}

export default HomePage;
