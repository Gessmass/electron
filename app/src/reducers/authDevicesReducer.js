import { DEVICES_AUTH } from "../actions/types.js";

const initialState = {
    "My Oximeter": {
        servicesUUIDs: [
            "cdeacb80-5235-4c07-8846-93a37ee6b86d"
        ],
        characteristicsUUIDs: [
            "cdeacb81-5235-4c07-8846-93a37ee6b86d",
            "cdeacb82-5235-4c07-8846-93a37ee6b86d"
        ]
    },
    "My Thermometer": {
        servicesUUIDs: [
            "0000fff0-0000-1000-8000-00805f9b34fb",
            "5833ff01-9b8b-5191-6142-22a4536ef123"
        ],
        characteristicsUUIDs: [
            "5833ff02-9b8b-5191-6142-22a4536ef123",
            "5833ff03-9b8b-5191-6142-22a4536ef123"
        ]
    },
    "F4": {
        servicesUUIDs: [
            "00001530-1212-efde-1523-785feabcd123",
            "00001530-1212-efde-1523-785feabcd123",
            "0000180a-0000-1000-8000-00805f9b34fb"
        ],
        characteristicsUUIDs: []
    }
}

const authDevicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEVICES_AUTH:
            return {
                ...state
            };
        default :
            return state
    }
}

export default authDevicesReducer