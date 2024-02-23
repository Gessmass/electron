import styled from "@emotion/styled"
import {Link, Outlet} from "react-router-dom"
import {Layout, Divider} from "antd"
import React, {useEffect} from "react";
import {DeviceDisplay} from "../components/DeviceDisplay.jsx";
import {useDispatch} from "react-redux";
import {startScanBluetoothDevices} from "../actions/index.js";

const {Header, Content, Sider} = Layout


export const LayoutPage = () => {

  return (
    <Layout style={{height: "100vh"}}>
      <Sider style={{
        backgroundColor: "000000"
      }}
      width={250}>
        <Logo>KLIGO</Logo>
        <Divider style={{backgroundColor: "#CECECE",
        margin: "10px 0 10px 0"}} type={"horizontal"}/>
        <DoctorNameWrapper>
          <DoctorName>N. Mesrine</DoctorName>
        <OrgaName>Cabinet de Verrieres</OrgaName>
        </DoctorNameWrapper>
        <Divider style={{backgroundColor: "#CECECE",
          margin: "10px 0 10px 0"}} type={"horizontal"}/>
        <DeviceDisplay />
      </Sider>
      <Content style={{
        padding: '0 48px',
        height: "100%",
        backgroundColor: "#439BFF"
      }}>
          <Outlet/>
      </Content>
    </Layout>
  );
};

const DoctorName = styled.h3`
    font-family: Beirut,serif;
    font-size: 25px;
    color: white;
`
const OrgaName = styled(DoctorName)`
    font-size: 15px;
`

const DoctorNameWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Logo = styled.div`
    width: 100%;
    font-size: 50px;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-family: "Hiragino Maru Gothic ProN";
`