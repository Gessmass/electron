import {HashRouter as Router, Routes, Route} from "react-router-dom";
import {LayoutPage} from './pages/LayoutPage.jsx'
import React from "react";
import {MesuresPage} from "./pages/MesuresPage.jsx";

const App = () => {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<LayoutPage/>}>
              <Route index element={<MesuresPage/>}/>
            </Route>
          </Routes>
      </Router>
  )
}

export default App