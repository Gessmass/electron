import styled from '@emotion/styled'
import ObservationLine from "./ObservationLine.jsx";


export default function MeasureCard({types}) {
  return (
    <MeasureCardWrapper>
      {types.map((type, index) => (
      <ObservationLine key={index} observation={type}/>
      ))}
    </MeasureCardWrapper>
  )
}

const MeasureCardWrapper = styled.div`
    border-radius: 6px;
    background-color: white;
    width: 370px;
    height: fit-content;
`

