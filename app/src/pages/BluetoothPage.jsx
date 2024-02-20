import styled from '@emotion/styled'
import {Button, Dropdown} from "antd"
import {RedoOutlined, CloseOutlined, LoadingOutlined} from "@ant-design/icons"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectBluetoothDevice, startScanBluetoothDevices, stopScanBluetoothDevices} from "../actions/index.js";
import {DISCOVERED_DEVICES} from "../actions/types.js";

export const BluetoothPage = () => {
  const dispatch = useDispatch()
  const devices = useSelector(state => state.bluetooth.deviceList)
  const isScanning = useSelector(state => state.bluetooth.isScanning)

// Dispatch une action Redux chaque fois qu'un dispositif est découvert
  useEffect(() => {
    window.electronAPI.onDeviceDiscovered((device) => {
      dispatch({ type: DISCOVERED_DEVICES, payload: { device } });
    });
    return () => {
      window.electronAPI.removeAllListeners();
    };
  }, [dispatch]);
  
  
  console.log(devices)
  
  return (
    <BluetoothPageWrapper>
      <DataForm>
        <DeviceListWrapper>
          <Button type="primary" icon={isScanning ? <LoadingOutlined/> : <RedoOutlined/>} onClick={() => {
            dispatch(startScanBluetoothDevices())
            }}>
            Scan Devices
          </Button>
          {devices.length}
          <DeviceListDisplay>
            {devices.map((device) => (
              <DeviceSelectorWrapper key={device.id} onClick={() => dispatch(selectBluetoothDevice(device.id))}>
                Nom: {device.name}
              </DeviceSelectorWrapper>
            ))}
          </DeviceListDisplay>
          <Button disabled={!isScanning} type="primary" danger icon={<CloseOutlined />} onClick={() => dispatch(stopScanBluetoothDevices())}>
            Stop Scanning
          </Button>
        </DeviceListWrapper>
        <FetchDataWrapper>
          {/*<Button disabled={!selectedDevice} type="primary" icon={<DownloadOutlined/>}>*/}
          {/*  Fetch data*/}
          {/*</Button>*/}
        </FetchDataWrapper>
      </DataForm>
      <DataDisplay>
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
