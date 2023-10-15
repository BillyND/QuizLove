import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Divider } from "antd";
import UpgradePlan from "./components/UpdradePlan/UpgradePlan";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Divider />
      <Footer />
    </div>
  );
};

export default Layout;
