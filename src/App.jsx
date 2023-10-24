import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import Auth from "./components/Auth/Auth";
import DetailFolder from "./components/DetailsFolder/DetailFolder";
import Explanations from "./components/Explanations/Explanations";
import GoodbyePage from "./components/GoodbyePage/GoodbyePage";
import Home from "./components/Home/Home";
import UpgradePlan from "./components/UpdradePlan/UpgradePlan";
import DetailUser from "./components/DetailUser/DetailUser";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import DetailCourse from "./components/DetailCourse/DetailCourse";

function App() {
  return (
    <div className="App non-copy">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Detail route */}
          <Route path="/:email/folders/:id" element={<DetailFolder />} />
          <Route path="/:email/courses/:id" element={<DetailCourse />} />
          <Route path="/:email" element={<DetailUser />} />
          <Route path="/create-set" element={<CreateCourse />} />
          <Route path="/goodbye" element={<GoodbyePage />} />
          <Route path="/upgrade" element={<UpgradePlan />} />
          <Route path="/explanations" element={<Explanations />} />
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
