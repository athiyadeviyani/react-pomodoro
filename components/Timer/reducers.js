// Reducer -- receiver of an action
// Whenever an action is triggered, the state of the application changes
// The handling of the application's state is done by the reducers

// A reducer is a pure function that calculates the next state based on the initial or previous state
// It always produces the same output if the state is unchanged
// It takes two inputs, and state and action must return the default state

import { START_TIMER, RESTART_TIMER, ADD_SECOND } from './types';

const TIMER_DURATION = 1500;

// Initial State
const initialState = {
  isPlaying: false,
  elapsedTime: 0,
  timerDuration: TIMER_DURATION
};

// Helper functions

// starts the timer
function applyStartTimer(state) {
  return {
    ...state,
    isPlaying: true
  };
}

// stop timer and set everything to default
function applyRestartTimer(state) {
  return {
    ...state,
    isPlaying: false,
    elapsedTime: 0,
    timerDuration: TIMER_DURATION
  };
}

// check if time passed is less than the total timer's duration
// if so, it will add one more second to increase its value
// if not, it will return the default state and stop the timer function from running
function applyAddSecond(state) {
  if (state.elapsedTime < TIMER_DURATION) {
    return {
      ...state,
      elapsedTime: state.elapsedTime + 1
    };
  } else {
    return {
      ...state,
      isPlaying: false
    };
  }
}

// Reducer Function

function reducer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      // handle the action here using helper functions
      return applyStartTimer(state);
    case RESTART_TIMER:
      // handle the action here using helper functions
      return applyRestartTimer(state);
    case ADD_SECOND:
      // handle the action here using helper functions
      return applyAddSecond(state);
    default:
      return state;
  }
}

export default reducer;


