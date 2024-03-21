import { combineReducers } from "redux";
import BLEReducer from "./BLEReducer.js";
import authDevicesReducer from "./authDevicesReducer.js";

const rootReducer = combineReducers({
    BLEReducer,
    authDevicesReducer
})

export default rootReducer