export const FR409parser = (dataview) => {
  
  if (dataview.getUint8(0) + dataview.getUint8(1) + dataview.getUint8(2) + dataview.getUint8(3)) {
  const bodyTemperature = dataview.getUint16(2)
    
    return {bodyTemperature: bodyTemperature}
  }
}