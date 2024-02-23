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
  
  
  return (
    <BluetoothPageWrapper>
      <TopDiv>
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
      </DataDisplay>
      </TopDiv>
      <Button style={{width: "150px"}} disabled={!selectedDevice} type="primary" icon={<DownloadOutlined/>}
              onClick={() => dispatch(selectBluetoothDevice(selectedDevice.id))}>
        Fetch data
      </Button>
      <BottomDiv>
      <ServiceDisplay>
        Service notifications :
        <ServiceData>
          {Object.entries(serviceNotification || {}).map(([key, value], index) => (
            <DataLine key={index}> {/* Ajoutez key={index} pour la liste */}
              <h1 style={{fontSize: "15px"}}>{key}: </h1>{value}
            </DataLine>
          ))}
        </ServiceData>
      </ServiceDisplay>
      </BottomDiv>
    </BluetoothPageWrapper>
  )
}

const BottomDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    background-color: #bbbbbb;
    border-radius: 6px;
    padding: 5px;
`

const TopDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DataLine = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`

const ServiceData = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    font-size: 15px;
    font-weight: 400;
    flex-direction: column;
`

const ServiceDisplay = styled.div`
    width: 100%;
    height: 30%;
`

const InfoDisplay = styled.div`
    width: 100%;
    height: 40px;
    flex-wrap: wrap;
    word-wrap: break-word;
    display: flex;
`

const DeviceInfosDisplay = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: start;
    gap: 5px;
    flex-direction: column;
`

const SelectedDeviceName = styled.h3`
    color: purple;
    font-size: 20px;
    width: 100%;
    height: 10%;
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
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const DataDisplay = styled.div`
    border: 1px solid black;
    border-radius: 6px;
    width: 50%;
    height: 300px;
    padding: 10px;
    background-color: #fff6f0;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
`
