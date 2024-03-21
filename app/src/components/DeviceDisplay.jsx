import styled from "@emotion/styled";
import { Menu } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startScan } from "../actions/index.js";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const DeviceDisplay = () => {
    const devices = useSelector(state => state?.bluetooth?.deviceList);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startScan())
    }, [dispatch]);


    // Transformer la liste des dispositifs en items de menu
    const deviceMenuItems = devices?.length > 0 ?
            devices.map((device, index) => getItem(device.name, `device-${index}`)) :
            [getItem('Aucun dispositif', 'no-device')]; // Message lorsque la liste est vide

    // Int�grer les dispositifs transform�s dans la structure des items de menu
    const items = [
        getItem('Mes devices', 'sub1', <DesktopOutlined/>, deviceMenuItems),
    ];


    return (
            <DeviceDisplayWrapper>
                <Menu
                        style={{ width: "100%", borderRadius: "6px" }}
                        mode="inline"
                        items={items}
                        selectable={false}></Menu>
            </DeviceDisplayWrapper>
    )
}

const DeviceDisplayWrapper = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 5px;
`;
