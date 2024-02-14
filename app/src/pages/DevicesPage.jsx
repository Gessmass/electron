import styled from "@emotion/styled";
import {DeviceDisplay} from "../components/DeviceDisplay.jsx";
export const DevicesPage= () => {
  
  const items = [
    1, 2, 3, 4, 5, 6
  ]
  
  return (
    <>
    <DeviceSectionTitle>Devices</DeviceSectionTitle>
      <DataPageWrapper>
        {items.map((item) => (
        <DeviceDisplay itemName={item}/>
        ))}
      </DataPageWrapper>
    </>
  )
}

const DataPageWrapper = styled.div`
    border: 2px solid lime;
    height: 400px;
    width: 100%;
    overflow-y: scroll;
`

const DeviceSectionTitle = styled.div`
    font-size: 40px;
    color: black;
    width: 100%;
    display: flex;
    justify-content: center;
`

