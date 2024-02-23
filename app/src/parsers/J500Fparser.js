export const J500Fparser = (dataview) => {
  
  if (dataview.getUint8(0) === 0x81 && dataview.getUint8(1) !== 0xFF && dataview.getUint8(2) !== 0x7F) {
    const spo2Avg = dataview.getUint8(2);
    const prAvg = dataview.getUint8(1);
    
    return {parsedSpo2Avg: spo2Avg, parsedPrAvg: prAvg}
  }
}
