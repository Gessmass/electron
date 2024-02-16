import styled from '@emotion/styled'
import {Button, Dropdown} from "antd"
import {DownloadOutlined, RedoOutlined, CloseOutlined, LoadingOutlined} from "@ant-design/icons"
import React, {useEffect, useState} from "react";
import {J500Fparser} from "../parsers/J500Fparser.js";
const {ipcRenderer} = window.require('electron')

export const BluetoothPage = () => {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  const [deviceInfo, setDeviceInfo] = useState(        {parsedSpo2Avg: null, parsedPrAvg: null}
  )
  
  const scanBluetoothDevices = async () => {
    console.log("scanBluetoothDevices");
    try {
    navigator.bluetoothRemoteGATTDescriptor.readValue({
        acceptAllDevices: true
      });
      
      
    } catch (error) {
      console.error('Error :', error);
    }
  };
  
  useEffect(() => {
    const handleDeviceList = (event, devices) => {
      const filteredDevices = devices.filter(device =>
        !device.deviceName.startsWith('Appareil'));
      setDevices(filteredDevices);
    };

    ipcRenderer.on('xyz', handleDeviceList);

    return () => {
      ipcRenderer.removeListener('xyz', handleDeviceList);
    };
  }, []);
  
  console.log(devices)


  const cancelDevicesScan = () => {
    console.log("stop scanning")
    ipcRenderer.send('cancel-devices-scan')
    setDisableButton(true)
    setDevices([])
  }
  
  
  const selectDevice = (device) => {
  ipcRenderer.send('channel-to-select-device', device.deviceId)
    setSelectedDevice(device)
    setDisableButton(true)
  }

  
  
  return (
    <BluetoothPageWrapper>
      <DataForm>
        <DeviceListWrapper>
          <Button type="primary" icon={disableButton ? <RedoOutlined/> : <LoadingOutlined />} onClick={() => {
            scanBluetoothDevices()
          setDisableButton(false)
            }}>
            Scan Devices
          </Button>
            {devices.length}
          <DeviceListDisplay>
            {devices.map((device, index) => (
            <DeviceSelectorWrapper key={index} onClick={() => selectDevice(device)}>
              <p>{device.deviceName}</p>
            </DeviceSelectorWrapper>
            ))}
          </DeviceListDisplay>
          <Button disabled={disableButton} type="primary" danger icon={<CloseOutlined />} onClick={() => cancelDevicesScan()}>
            Stop Scanning
          </Button>
        </DeviceListWrapper>
        <FetchDataWrapper>
          <Button disabled={!selectedDevice} type="primary" icon={<DownloadOutlined/>}>
            Fetch data
          </Button>
        </FetchDataWrapper>
      </DataForm>
      <DataDisplay>
        {selectedDevice &&
        <SelectedDeviceName>{selectedDevice.deviceName}</SelectedDeviceName>
        }
      </DataDisplay>
    </BluetoothPageWrapper>
  )
}

const SelectedDeviceName = styled.h3`
    color: purple;
    font-size: 20px;
`


const DeviceSelectorWrapper = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 50px;
    cursor: pointer;

    &:hover {
        background-color: rgba(160, 160, 160, 0.42);
    }
`

const DeviceListDisplay = styled.div`
    border: 1px solid black;
    height: 200px;
    width: 100%;
    border-radius: 6px;
    overflow-y: scroll;
`

const DeviceListWrapper = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`

const FetchDataWrapper = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`


const DataForm = styled.div`
    width: 50%;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    gap: 10px;
    min-height: 400px;
`

const BluetoothPageWrapper = styled.div`
    display: flex;
`

const DataDisplay = styled.div`
    border: 1px solid black;
    border-radius: 6px;
    min-height: 200px;
    width: 50%;
    padding: 10px;
    background-color: #fff6f0;
`
