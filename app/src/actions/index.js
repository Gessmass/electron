import { START_SCAN } from "./types.js";

export const startScan = () => {
    console.log("action index")
    return {
        type: START_SCAN
    }
}