export const BS200parser = (value) => {
  
  if (value.length !== 34) {
    throw new Error("Invalid input length in BS200 parser")
  }
  
  const hexToInt = (hex) => parseInt(hex, 16)
  
  const parseMacAdress = (mac) => mac.match(/.{1,2}/g).join(':')
  
  const packet = {
    len: hexToInt(value.substring(0,2)),
    type: value.substring(2,4),
    data: {
      version: hexToInt(value.substring(4,6)),
      serialNumber: hexToInt(value.substring(6,8)),
      weight: (hexToInt(value.substring(8, 10)) << 8) + hexToInt(value.substring(10,12)),
      resistance: (hexToInt(value.substring(12, 14)) << 8) + hexToInt(value.substring(14, 16)),
      productId: (hexToInt(value.substring(16, 18)) << 8) + hexToInt(value.substring(18, 20)),
      MACAddress: parseMacAdress(value.substring(22, 34))
    }
  }
  return packet
}