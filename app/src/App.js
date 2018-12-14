import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import React from 'react';
import { Navigator } from 'react-onsenui';
import HomePage from './HomePage/HomePage';

function renderPage(route, navigator) {
  const props = route.props || {};
  props.navigator = navigator;

  return React.createElement(route.component, props);
}

function App() {
  const route = {
    component: HomePage,
    props: {
      key: 'Home Page',
    },
  };

  return (
    <Navigator
      initialRoute={route}
      renderPage={renderPage}
      swipeable
    />
  );
}

export default App;
