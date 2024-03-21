import * as fromDevices from "./index.js";

export const getAuthDevices = state => fromDevices.getAuthDevices(state.authDevicesReducer)

