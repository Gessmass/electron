export const J500Fparser = (value) => {
  // Assurez-vous que 'value' est un ArrayBuffer avant de créer un DataView
  let dataView;
  if (value instanceof DataView) {
    dataView = value;
  } else if (value.buffer && value.buffer instanceof ArrayBuffer) {
    dataView = new DataView(value.buffer);
  } else if (value instanceof ArrayBuffer) {
    dataView = new DataView(value);
  } else {
    console.error("L'objet fourni n'est pas un DataView ou un ArrayBuffer.");
    return; // Sortie précoce si 'value' n'est pas le type attendu
  }
  
  if (dataView.getUint8(0) === 0x81 && dataView.getUint8(1) !== 0xFF && dataView.getUint8(2) !== 0x7F) {
    const spo2Avg = dataView.getUint8(2);
    const prAvg = dataView.getUint8(1);
    
    return {
      parsedSpo2Avg: spo2Avg,
      parsedPrAvg: prAvg,
      value
    };
  }
}
