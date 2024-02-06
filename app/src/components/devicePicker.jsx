import styled from '@emotion/styled'
import {createRef, useEffect, useState} from "react";

const {ipcRenderer} = window.require('electron')
export const DevicePicker = () => {
  const [deviceList, setDeviceList] = useState([])
  
  const devicePickerSelection = createRef()
  const selectButton = createRef()
  const cancelButton = createRef()
  
  useEffect(() => {
    const receivedDeviceListHandler = (event, bluetoothDeviceDiscoveredList) => {
      console.log("Device List received")
      setDeviceList(bluetoothDeviceDiscoveredList)
    };
    
    ipcRenderer.on('receivedDeviceList', receivedDeviceListHandler);
    
    return () => {
      ipcRenderer.removeListener('receivedDeviceList', receivedDeviceListHandler);
    };
  }, []);

  
  const selectFromDevicePicker = () => {
    const selectedDevice = devicePickerSelection.current.value
    const deviceId = selectedDevice.id
    
    ipcRenderer.send('channelForSelectingDevice', deviceId)
  }
  
  const cancelDevicePicker = () => {
    ipcRenderer.send('channelForTerminationSignal')
  }
  
  
  
  return (
  <DevicePickerWrapper></DevicePickerWrapper>
  )
}

const DevicePickerWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: burlywood;
`