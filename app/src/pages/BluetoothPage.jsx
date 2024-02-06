import styled from '@emotion/styled'
import {Button, Dropdown} from "antd"
import {DownloadOutlined, RedoOutlined, CloseOutlined } from "@ant-design/icons"
import React from "react";
import {deviceTest} from "../connections/bluetooth.js";

export const BluetoothPage = () => {
  
  // const options = {
  //   acceptAllDevices: true
  // }
  // const getBluetoothDevices = async () => {
  // navigator.bluetooth.requestDevice(options)
  //   .then((device) => {
  //     console.log(device.name)
  //   }).catch((error) => {
  //     console.log(error)
  // })
  // };
  //
  
  

  
  return (
    <BluetoothPageWrapper>
      <DataForm>
        <DeviceListWrapper>
          <Button type="primary" icon={<RedoOutlined/>} onClick={() => deviceTest()}>
            Scan Devices
          </Button>
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
    min-height: 300px;
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
