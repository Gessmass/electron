export const J500Fparser = (value) => {
  value = value.buffer ? value : new DataView(value)
  let lastMeasureUnit8Array


  if (value.getUint8(0) === 0x81 && value.getUint8(1) !== 0xFF && value.getUint8(2)!==  0x7F) {
    const spo2Avg = value.getUint8(2)
    const prAvg = value.getUint8(1)
    
    return {
      parsedSpo2Avg: spo2Avg,
      parsedPrAvg: prAvg
    }
  }
}

