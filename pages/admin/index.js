import React, { useEffect, useState } from "react";
import CurrentState from "@component/components/Dashboard/CurrentState/CurrentState";
import DashboardHome from "@component/components/Dashboard/DataDisplay/DashboardHome/DashboardHome";
import Navbar from "@component/components/Dashboard/Navbar/Navbar";
import getNavigation from "@component/components/Dashboard/Navigation";
import Sidebar from "@component/components/Dashboard/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { BiAlignLeft } from "react-icons/bi";
import MobileSidebar from "@component/components/Dashboard/MobileSidebar/MobileSidebar";
import { useRouter } from "next/router";


export default function Home() {
  const [navigateMain, setNavigateMain] = useState([]);
  const [navigateOther, setNavigateOther] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(DashboardHome);
  const router = useRouter();

  useEffect(() => {
    const array = getNavigation();
    console.log(array);
    setNavigateMain([...array[0]]);
    setNavigateOther([...array[1]]);

    if (typeof document === "undefined") {
      router.push('/admin/login')
    }
  }, [router]);
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
        <CurrentState currentComponent={currentComponent}></CurrentState>
      </div>
    </div>
  );
}
