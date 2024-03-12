import styled from "@emotion/styled"
import {Outlet, useLocation} from "react-router-dom"
import {Layout, Divider} from "antd"
import React, {useEffect} from "react";
import {DeviceDisplay} from "../components/DeviceDisplay.jsx";

const { Content, Sider} = Layout


export const LayoutPage = () => {
  const location = useLocation()

  return (
    <Layout style={{height: "100vh"}}>
      <Sider style={{
        backgroundColor: "000000"
      }}
      width={230}>
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
      <ContentWrapper>
        <TitleWrapper>
        <PageTitle>Page title</PageTitle>
        </TitleWrapper>
        <Content style={{
          padding: '0 28px',
          height: "100%",
          width: "100%"
        }}>
            <Outlet/>
        </Content>
      </ContentWrapper>
    </Layout>
  );
};

const PageTitle = styled.h1`
    color: white;
    font-size: 40px;
`

const TitleWrapper = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: #439BFF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

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