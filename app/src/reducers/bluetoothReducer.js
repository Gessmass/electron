import { DISCOVERED_DEVICES } from "../actions/types.js"; // Assurez-vous d'avoir le bon chemin d'accès

const initialState = {
  deviceList: []
};

const bluetoothReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISCOVERED_DEVICES:
      console.log('DISCOVERED_DEVICES action received');
      // Assurez-vous que la payload contient un tableau de dispositifs découverts
      // et que vous fusionnez correctement avec l'état existant
      return {
        ...state,
        deviceList: [...state.deviceList, ...action.payload.devices]
      };
    default:
      return state;
  }
};

export default bluetoothReducer;
