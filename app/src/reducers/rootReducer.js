import {combineReducers} from "redux";
import bluetoothReducer from '../reducers/bluetoothReducer.js'

const rootReducer = combineReducers({
  bluetooth: bluetoothReducer,
})

export default rootReducer