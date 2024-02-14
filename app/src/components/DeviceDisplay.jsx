import styled from "@emotion/styled";
import {Button} from "antd";

export const DeviceDisplay = ({itemName}) => {
  
  return (
    <>
      <DeviceDisplayWrapper>
        <h2>{itemName}</h2>
        <Button type={"text"}>Disconnect</Button>
      </DeviceDisplayWrapper>
    </>
  )
}

const DeviceDisplayWrapper = styled.div`
    width: 100%;
    height: 70px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
   
`

