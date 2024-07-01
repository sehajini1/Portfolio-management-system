import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Loging from "./Pages/LogingPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Loging />}></Route>
          <Route exact path="/details" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
