import styled from "@emotion/styled";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {bluetoothConnectRequest} from "../actions/bluetoothActions.js";

export const ObservationDisplay = ({observationType}) => {
  const dispatch = useDispatch()
  const bluetoothData = useSelector(state => state.bluetooth.data)
  const error = useSelector(state => state.bluetooth.error)
  
  useEffect(() => {
    dispatch(bluetoothConnectRequest())
  }, [dispatch]);
  
  console.log(bluetoothData)
  console.log(error)
  
  return (
    <ObservationDisplayBorder>
    <ObservationName>{observationType}</ObservationName>
      <ObservationResult>{bluetoothData}</ObservationResult>
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
