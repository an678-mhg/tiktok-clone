import React, { useState } from "react";
import Header from "../components/Header";
import { Layout } from "../types";

interface MainLayoutProps extends Layout {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="text-white">
      <Header />

      <div className="container mt-[57px] flex">{children}</div>
    </div>
  );
};

export default MainLayout;
