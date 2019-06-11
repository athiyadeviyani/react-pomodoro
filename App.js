import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Timer from './components/Timer/index';

// Creating Redux Store
// Store -- an object that brings actions and reducers together
// It provides and holds state at the application level instead of individual components
// Redux is not an opinionated library in terms of which framework or library should use it or not

// To bind a React or React Native application with Redux, you do it with react-redux module
// This is done by using the high ordered component Provider
// It basically passes the store down to the rest of the application
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './components/Timer/reducers';

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Timer />
      </Provider>
    );
  }
}