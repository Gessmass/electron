import styled from '@emotion/styled'
import {Button, Dropdown} from "antd"
import {RedoOutlined, CloseOutlined, LoadingOutlined, DownloadOutlined} from "@ant-design/icons"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBluetoothDevice, startScanBluetoothDevices, stopScanBluetoothDevices} from "../actions/index.js";

export const BluetoothPage = () => {
  const dispatch = useDispatch()
  const devices = useSelector(state => state.bluetooth.deviceList)
  const isScanning = useSelector(state => state.bluetooth.isScanning)
  const serviceNotification = useSelector(state => state.bluetooth.serviceNotification)
  const [selectedDevice, setSelectedDevice] = useState(null)
  
  console.log("selected device:", selectedDevice)
  
  return (
    <BluetoothPageWrapper>
      <DataForm>
        <DeviceListWrapper>
          <Button type="primary" icon={isScanning ? <LoadingOutlined/> : <RedoOutlined/>} onClick={() => {
            dispatch(startScanBluetoothDevices());
            setSelectedDevice(null)
          }}>
            Scan Devices
          </Button>
          {devices.length}
          <DeviceListDisplay>
            {devices.map((device) => (
              <DeviceSelectorWrapper key={device.id} onClick={() => setSelectedDevice(device)}>
             {device.name}
              </DeviceSelectorWrapper>
            ))}
          </DeviceListDisplay>
          <Button disabled={!isScanning} type="primary" danger icon={<CloseOutlined />} onClick={() => dispatch(stopScanBluetoothDevices())}>
            Cancel Scanning
          </Button>
        </DeviceListWrapper>
        <FetchDataWrapper>
        </FetchDataWrapper>
      </DataForm>
      <DataDisplay>
        <SelectedDeviceName>{selectedDevice?.name}</SelectedDeviceName>
        <DeviceInfosDisplay>
          <InfoDisplay>Adress : {selectedDevice?.infos.adress}</InfoDisplay>
          <InfoDisplay>Adress Type : {selectedDevice?.infos.adressType}</InfoDisplay>
          <InfoDisplay>UUID : {selectedDevice?.infos.uuid}</InfoDisplay>
          <InfoDisplay>Connectable : {selectedDevice?.infos.connectable}</InfoDisplay>
          <InfoDisplay>State : {!!selectedDevice?.infos.state}</InfoDisplay>
        </DeviceInfosDisplay>
          <ServiceDisplay>
            Service notifications :
            {serviceNotification}
          </ServiceDisplay>
      <Button disabled={!selectedDevice} type="primary" icon={<DownloadOutlined/>}
      onClick={() => dispatch(selectBluetoothDevice(selectedDevice.id))}>
        Fetch data
      </Button>
      </DataDisplay>
    </BluetoothPageWrapper>
  )
}

const ServiceDisplay = styled.div`
    width: 100%;
    height: 30%;
`

const InfoDisplay = styled.div`
    width: 100%;
    height: 40px;
    flex-wrap: wrap;
    word-wrap: break-word;
`

const DeviceInfosDisplay = styled.div`
    width: 100%;
    height: 60%;
`

const SelectedDeviceName = styled.h3`
    color: purple;
    font-size: 20px;
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`


const DeviceSelectorWrapper = styled.div`
    border: 1px solid black;
    width: 100%;
    height: 50px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 100%;
    height: 500px;
    padding: 10px;
    background-color: #fff6f0;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
`
