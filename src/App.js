import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Loging from "./Pages/LogingPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./component/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Loging />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/details" element={<Home />} />
          </Route>
        </Routes>
        <ToastContainer autoClose={3000}/>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
