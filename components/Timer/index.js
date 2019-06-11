import React from 'react';
import { StyleSheet, Text, View, StatusBar, Alert } from 'react-native';

// Import button
import Button from './button';

// Background style
import { LinearGradient } from 'expo';
const primaryStart = '#2BC0E4';
const primaryEnd = '#EAECC6';
const pga = [primaryStart, primaryEnd];

// We need to bind action creators with our Timer function in order to make it fully functional, so that it responds to the touchable events or the start or restart of the timer

// First, we import the required dependencies to bind action creators
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; // maps action functions to an object using the names of the action functions
import { actionCreators as actions } from './actions';

import call from 'react-native-phone-call';

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  time -= minutes * 60;
  let seconds = parseInt(time % 60, 10);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
}

class Timer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const currentProps = this.props;
    if (!currentProps.isPlaying && nextProps.isPlaying) {
      // start the interval
      const timerInterval = setInterval(() => {
        currentProps.addSecond();
      }, 1000);
      this.setState({ timerInterval });
    } else if (currentProps.isPlaying && !nextProps.isPlaying) {
      // stop the interval
      clearInterval(this.state.timerInterval);
    }
  }

  call = () => {
    //handler to make a call
    const args = {
      number: '999',
      prompt: false,
    };

    call(args).catch(console.error);
  };
  render() {
    const {
      isPlaying,
      elapsedTime,
      timerDuration,
      startTimer,
      restartTimer,
    } = this.props;

    return (
      <LinearGradient colors={pga} style={styles.container}>
        <StatusBar barStyle={'light-content'} />

        <View style={styles.upper}>
          <Text style={styles.time}>
            {formatTime(timerDuration - elapsedTime)}
          </Text>
        </View>

        <View style={styles.lower}>
          <View style={{ margin: 20 }}>
            {!isPlaying && (
              <Button iconName="play-circle" onPress={startTimer} />
            )}
          </View>

          <View style={{ margin: 20 }}>
            {isPlaying && <Button iconName="phone-square" onPress={this.call} />}
          </View>

          <View style={{ margin: 20 }}>
            {!isPlaying && (
              <Button iconName="stop-circle" onPress={restartTimer} />
            )}
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  upper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lower: {
    marginTop: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  time: {
    marginTop: 75,
    color: '#ffffff',
    fontSize: 120,
    fontWeight: '100',
  },
});

// bindActionCreators maps action functions to an object using the names of the action functions. These functions automatically dispatch the action to the store when the function is called.
// To change the data, we need to dispatch an action. To enable this, we need two things: mapStateToProps and mapDispatchToProps, and we need to connect both of them with our component.

function mapStateToProps(state) {
  const { isPlaying, elapsedTime, timerDuration } = state;
  return {
    isPlaying,
    elapsedTime,
    timerDuration,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startTimer: bindActionCreators(actions.startTimer, dispatch),
    restartTimer: bindActionCreators(actions.restartTimer, dispatch),
    addSecond: bindActionCreators(actions.addSecond, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer);
