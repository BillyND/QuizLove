import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/AuthPage/Login";
import Register from "./components/AuthPage/Register";
import Home from "./components/Home";
import Layout from "./Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
      <Login />
    </div>
  );
}

export default App;
