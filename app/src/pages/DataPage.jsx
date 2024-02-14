import styled from "@emotion/styled";
import {ObservationDisplay} from "../components/ObservationDisplay.jsx";

export const DataPage= () => {
  const types = [
    'Température',
    'Poids',
    'Pouls',
    'Tension systolique',
    'Tension diastolique',
    'Glycémie',
    'Saturation pulsée',
    'Taille',
    'CRP',
    'HbA1c',
    'ACR',
    'Alb',
    'Creat',
    'Chol',
    'LDL',
    'HDL',
    'Trig',
    'non-HDL',
    'Chol/HDL'
  ]
  
  return (
    <>
    <DataSectionTitle>Data</DataSectionTitle>
      <DataWrapper>
        {types.map((type) => (
         <ObservationDisplay observationType={type}/>
        ))}
      </DataWrapper>
    </>
  )
}

const DataSectionTitle = styled.div`
    font-size: 40px;
    color: black;
    width: 100%;
    display: flex;
    justify-content: center;
`

const DataWrapper = styled.div`
    background-color: #bdbdbd;
    border-radius: 6px;
    width: 400px;
`
