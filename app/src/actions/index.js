// Action Types

import { START_SCAN } from "./types.js";

export const startScan = () => {
    console.log("action")
    return {
        type: START_SCAN
    }
}