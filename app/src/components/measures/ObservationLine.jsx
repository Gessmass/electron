import styled from "@emotion/styled";

export default function ObservationLine({observation}) {
  return (
    <ObservationLineWrapper>
      <ObservationName>{observation.type}</ObservationName>
      <ObservationValueWrapper>
        <ObsValue></ObsValue>
      </ObservationValueWrapper>
      <ObsUnit>{observation.unit}</ObsUnit>
    </ObservationLineWrapper>
  )
}

const ObsUnit = styled.p`
    color: #b4b4b4;
    font-family: "Arial";
    font-size: 17px;
    padding: 5px;
`

const ObsValue = styled.p`
    color: black;
    font-size: 25px;
    font-family: "Arial";
`

const ObservationValueWrapper = styled.div`
    background: #d7d7d7;
    width: 25%;
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 5px;
`

const ObservationName = styled.div`
    font-size: 20px;
    font-family: "Arial";
    font-weight: bold;
    color: black;
    width: 60%;
`

const ObservationLineWrapper = styled.div`
    width: 100%;
    height: 50px;
    padding: 5px;
    display: flex;
    justify-content: start;
    align-items: center;
`


