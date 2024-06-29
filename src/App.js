import './App.css';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/LandingPage'


function App() {
  return (
    <>
      <Router>
        <Content>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        </Content>
      </Router>
    </>
  );
}
const Content = styled.div`
  ${
    "" /* position: absolute;
  margin-top: 10%; */
  }
`;

export default App;
