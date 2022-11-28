import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Layout } from "../types";

interface MainLayoutProps extends Layout {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="text-white">
      <Header />

      <div className="container flex">{children}</div>
    </div>
  );
};

export default MainLayout;
