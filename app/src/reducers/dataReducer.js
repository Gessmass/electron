import {UPDATE_BLE_DATA} from "../actions/types.js";

const initialState = {
  bleData: {}
}


const bleDataReducer = (state= initialState, action) => {
  switch (action.type) {
    case UPDATE_BLE_DATA:
      const {dataType, data} = action.payload
      return {
        ...state,
        bleData: {
          ...state.bleData,
          [dataType]: data
        }
      }
    default:
      return state
  }
}

export default bleDataReducer