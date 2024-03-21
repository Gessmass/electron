import { START_SCAN } from "../actions/types.js";

const initialState = {}

const BLEReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_SCAN:
            return {
                ...state,
                isScanning: true,
            }
        default:
            return state
    }
}

export default BLEReducer