import styled from '@emotion/styled'
import {Button, Dropdown} from "antd"
import {DownloadOutlined, RedoOutlined, CloseOutlined } from "@ant-design/icons"
import React, {useEffect, useState} from "react";
// const {ipcRenderer} = window.require('electron')

export const BluetoothPage = () => {
  const [devices, setDevices] = useState([])
  
  const scanBluetoothDevices = async () => {
    console.log("scanBluetoothDevices")
    
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    }).then((device) => {
      console.log("device", device)
    })
  }
  
  // useEffect(() => {
  //   const handleDeviceList = (event, devices) => {
  //     setDevices(devices);
  //   };
  //
  //   ipcRenderer.on('xyz', handleDeviceList);
  //
  //   return () => {
  //     ipcRenderer.removeListener('xyz', handleDeviceList);
  //   };
  // }, []);
  //
  //
  // const cancelDevicesScan = () => {
  //   ipcRenderer.send('cancel-devices-scan')
  // }
  //
  
  
  return (
    <BluetoothPageWrapper>
      <DataForm>
        <DeviceListWrapper>
          <Button type="primary" icon={<RedoOutlined/>} onClick={() => scanBluetoothDevices()}>
            Scan Devices
          </Button>
          <DeviceListDisplay>
            {devices.map(device => (
              <li key={device.id}>{device.deviceName}</li>
            ))}
          </DeviceListDisplay>
          <Button type="primary" danger icon={<CloseOutlined />} >
            Disconnect Device
          </Button>
        </DeviceListWrapper>
        <FetchDataWrapper>
          <Button type="primary" icon={<DownloadOutlined/>}>
            Fetch data
          </Button>
        </FetchDataWrapper>
      </DataForm>
      <DataDisplay>
      </DataDisplay>
    </BluetoothPageWrapper>
  )
}

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
