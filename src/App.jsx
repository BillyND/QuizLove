import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
      <Auth />
    </div>
  );
}

export default App;
