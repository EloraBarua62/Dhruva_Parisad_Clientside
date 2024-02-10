import CurrentState from "@component/components/Dashboard/CurrentState/CurrentState";
import DashboardHome from "@component/components/Dashboard/DataDisplay/DashboardHome/DashboardHome";
import Navbar from "@component/components/Dashboard/Navbar/Navbar";
import getNavigation from "@component/components/Dashboard/Navigation";
import Sidebar from "@component/components/Dashboard/Sidebar/Sidebar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiAlignLeft } from "react-icons/bi";
import MobileSidebar from "@component/components/Dashboard/MobileSidebar/MobileSidebar";

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(DashboardHome);
  const [navigateMain, setNavigateMain] = useState([]);
  const [navigateOther, setNavigateOther] = useState([]);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    const array = getNavigation(role);
    setNavigateMain([...array[0]]);
    setNavigateOther(array[1]);
    console.log(role);
  }, [role]);
  return (
    <div className="dashboard_design">
      {!openSidebar ? (
        <div className="sidebar_icon">
          <BiAlignLeft
            className="icon_design"
            onClick={() => setOpenSidebar(!openSidebar)}
          />
        </div>
      ) : (
        ""
      )}

      {openSidebar ? (
        <MobileSidebar
          navigateMain={navigateMain}
          navigateOther={navigateOther}
          setCurrentComponent={setCurrentComponent}
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      ) : (
        ""
      )}
      <Sidebar
        navigateMain={navigateMain}
        navigateOther={navigateOther}
        setCurrentComponent={setCurrentComponent}
      />
      <div>
        <Navbar />
        <CurrentState currentComponent={currentComponent}></CurrentState>
      </div>
    </div>
  );
}
