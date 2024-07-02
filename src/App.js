import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Loging from "./Pages/LogingPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Loging />}></Route>
          <Route exact path="/details" element={<Home />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
