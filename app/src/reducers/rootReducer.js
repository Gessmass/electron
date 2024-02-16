import {combineReducers} from "redux";
import bluetoothReducer from './bluetoothSlice.js'
// La methode ".reducer" de RTK renomme automatiquement le fichier en "deviceRducer"

const rootReducer = combineReducers({
  bluetooth: bluetoothReducer
})

export default rootReducer