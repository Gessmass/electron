import styled from '@emotion/styled'
import MeasureCard from "../components/measures/MeasureCard.jsx";
import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { startScan } from "../actions/index.js";

export const MesuresPage = () => {
    const dispatch = useDispatch()

    const types = [
        { type: "Taille", value: '180', unit: 'cm' },
        { type: "Poids", value: '60', unit: "Kg" },
        { type: "Température", value: "36.7", unit: "°C" },
        { type: "Pouls", value: "90", unit: "Bpm" },
        { type: "Tension systolique", value: "68", unit: "GTD" },
        { type: "Tension diastollique", value: "56", unit: "GTD" },
        { type: "Glycémie", value: "78", unit: "mg/dl" },
        { type: "Saturation pulsée", value: "89", unit: "SpO2" },
        { type: "CRP", value: "46", unit: "mg/L" },
        { type: "HbA1c", value: "180", unit: "mg/L" },
        { type: "ACR", value: "189", unit: "mg/L" },
        { type: "Alb", value: "11.3", unit: "mg/L" },
        { type: "Creat", value: "120", unit: "mg/dl" },
        { type: "Chol", value: "73", unit: "mg/L" },
        { type: "LDL", value: "272", unit: "mg/L" },
        { type: "HDL", value: "58", unit: "mg/L" }
    ]

    useEffect(() => {
        dispatch(startScan())
    }, [dispatch]);

    const midIndex = Math.ceil(types.length / 2)

    const firstHalf = types.slice(0, midIndex)
    const secHalf = types.slice(midIndex)


    return (
            <MeasuresPageWrapper>
                <CardsArea>
                    <MeasureCard types={firstHalf}/>
                    <MeasureCard types={secHalf}/>
                </CardsArea>
                <ButtonsArea>
                    <Button>Copier les données</Button>
                    <Button>Envoyer les données vers mon LGC</Button>
                </ButtonsArea>
            </MeasuresPageWrapper>
    )
}

const ButtonsArea = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
`

const CardsArea = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const MeasuresPageWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`