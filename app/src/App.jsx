import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {LayoutPage} from './pages/LayoutPage.jsx'
import {BluetoothPage} from "./pages/BluetoothPage"
import {WifiPage} from "./pages/WifiPage"
import {EthernetPage} from "./pages/EthernetPage"
import {DevicesPage} from "./pages/DevicesPage";
import {DataPage} from "./pages/DataPage";
import React from "react";

const App = () => {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<LayoutPage/>}>
              <Route index path="/bluetooth" element={<BluetoothPage/>}/>
              <Route path="/wifi" element={<WifiPage/>}/>
              <Route path="/ethernet" element={<EthernetPage/>}/>
              <Route path="/devices" element={<DevicesPage/>}/>
              <Route path="/data" element={<DataPage/>}/>
            </Route>
          </Routes>
      </Router>
  )
}

export default App