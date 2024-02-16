import styled from '@emotion/styled'
import {Button, Dropdown} from "antd"
import {DownloadOutlined, RedoOutlined, CloseOutlined, LoadingOutlined} from "@ant-design/icons"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {discoveredDevice} from "../reducers/bluetoothSlice.js";

const {ipcRenderer} = window.require('electron')

export const BluetoothPage = () => {
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [disableButton, setDisableButton] = useState(true)
  
  const dispatch = useDispatch()
  const devices = useSelector(state => state.bluetooth.devices)
  
  const scanBluetoothDevices = () => {
    dispatch({type: 'BLUETOOTH/START_SCAN'})
    setDisableButton(false)
  }
  
  const cancelBluetoothScan = () => {
    dispatch({type: 'BLUETOOTH/STOP_SCAN'})
    setDisableButton(true)
  }
  
  console.log(devices)
  
  return (
    <BluetoothPageWrapper>
      <DataForm>
        <DeviceListWrapper>
          <Button type="primary" icon={disableButton ? <RedoOutlined/> : <LoadingOutlined />} onClick={() => {
            scanBluetoothDevices()
            }}>
            Scan Devices
          </Button>
          {devices.length}
          <DeviceListDisplay>
            {devices.map((device) => (
              <DeviceSelectorWrapper key={device.id}>
                Nom: {device.name || 'Appareil sans nom'} - RSSI: {device.rssi}
              </DeviceSelectorWrapper>
            ))}
          </DeviceListDisplay>
          <Button disabled={disableButton} type="primary" danger icon={<CloseOutlined />} onClick={cancelBluetoothScan}>
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
