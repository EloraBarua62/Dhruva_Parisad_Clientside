import React, { useEffect, useState } from "react";
import CurrentState from "@component/components/Dashboard/CurrentState/CurrentState";
import DashboardHome from "@component/components/Dashboard/DataDisplay/DashboardHome/DashboardHome";
import Navbar from "@component/components/Dashboard/Navbar/Navbar";
import getNavigation from "@component/components/Dashboard/Navigation";
import Sidebar from "@component/components/Dashboard/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { BiAlignLeft } from "react-icons/bi";
import MobileSidebar from "@component/components/Dashboard/MobileSidebar/MobileSidebar";
import {
  enlistedSchools,
  enlistedZone,
} from "@component/app/Reducers/schoolReducer";

export default function Home() {
  const [navigateMain, setNavigateMain] = useState([]);
  const [navigateOther, setNavigateOther] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(DashboardHome);
  const { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  

  useEffect(() => {
    // const array = getNavigation(role);
const array = getNavigation();
    console.log(array);
    setNavigateMain([...array[0]]);
    setNavigateOther([...array[1]]);
    // dispatch(enlistedZone());
    // dispatch(enlistedSchools("all"));
    // console.log(role);
  }, []);
  return (
    <div className="dashboard_design">
      {/* Drawer Icon */}
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
