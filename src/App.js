import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Auths/Login";
import Register from "./components/Auths/Register";
import Spinner from "./components/Layouts/Spinner";
import Layout from "./components/Layouts/Layout";
import Chart from "./components/Contents/Chart";
import SideBar from "./components/Layouts/SideBar";
function App() {
  return (
    <>
      <Router>
        <SideBar></SideBar>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/analysis" element={<Chart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
