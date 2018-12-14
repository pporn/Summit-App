import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Page,
  List,
  ListItem,
} from 'react-onsenui';

import Navbar from './Navbar/Navbar';
import UserCheckInPage from '../UserCheckInPage/UserCheckInPage';


class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availablePages: [
        {
          title: 'Check In',
          page: UserCheckInPage,
        },
      ],
      navigator: props.navigator,
    };

    this.renderRow = this.renderRow.bind(this);
    this.pushPage = this.pushPage.bind(this);
  }

  pushPage(page, title) {
    const { navigator } = this.state;

    const route = {
      component: page,
      props: {
        key: title,
      },
    };

    navigator.pushPage(route);
  }

  renderRow(data, index) {
    return (
      <ListItem
        modifier="tappable chevron"
        key={index}
        onClick={() => this.pushPage(data.page, data.title)}
      >
        {data.title}
      </ListItem>
    );
  }

  render() {
    const { availablePages } = this.state;

    return (
      <Page renderToolbar={() => <Navbar />}>
        <List
          dataSource={availablePages}
          renderRow={this.renderRow}
        />
      </Page>
    );
  }
}

HomePage.propTypes = {
  navigator: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default HomePage;
