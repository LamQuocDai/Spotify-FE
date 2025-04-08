import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";

const Admin = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      <Navbar isCollapsed={isCollapsed} />
      <div className="flex-1 flex flex-col">
        <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="bg-[#f1f3f5] flex-1 px-8 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;