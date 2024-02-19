import styled from "@emotion/styled";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";

export const ObservationDisplay = ({observationType}) => {


  return (
    <ObservationDisplayBorder>
      <ObservationName>{observationType}</ObservationName>

      <ObservationResult></ObservationResult>
    </ObservationDisplayBorder>
  )
}

const ObservationResult = styled.h3`
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: flex-end;
    `
const ObservationName = styled(ObservationResult)`
    justify-content: flex-start;
  `
const ObservationDisplayBorder = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
  `