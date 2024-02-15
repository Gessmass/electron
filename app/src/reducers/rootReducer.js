import { combineReducers } from 'redux';
import bluetoothReducer from './bluetoothReducer.js';

const rootReducer = combineReducers({
  bluetooth: bluetoothReducer,
  // autres reducers
});

export default rootReducer;
