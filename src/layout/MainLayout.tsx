import React from "react";
import Header from "../components/Header";
import { Layout } from "../types";

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <div className="text-white">
      <Header />

      <div className="container mt-[57px] flex">{children}</div>
    </div>
  );
};

export default MainLayout;
