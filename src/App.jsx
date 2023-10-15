import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpgradePlan from "./components/UpdradePlan/UpgradePlan";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upgrade" element={<UpgradePlan />} />
        </Routes>
      </Layout>
      <Auth />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
