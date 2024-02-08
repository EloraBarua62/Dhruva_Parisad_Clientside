import CurrentState from '@component/components/Dashboard/CurrentState/CurrentState';
import DashboardHome from '@component/components/Dashboard/DataDisplay/DashboardHome/DashboardHome';
import Navbar from '@component/components/Dashboard/Navbar/Navbar';
import getNavigation from '@component/components/Dashboard/Navigation';
import Sidebar from '@component/components/Dashboard/Sidebar/Sidebar';
import React, { useState } from 'react';

export default function Home() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(DashboardHome);
  const [navigateMain, setNavigateMain] = useState([]);
  const [navigateOther, setNavigateOther] = useState([]);

  useEffect(() => {
    setNavigateMain(getNavigation(role)[0]);
    setNavigateOther(getNavigation(role)[1]);
  }, []);
  return (
    <div>
      <Sidebar
        navigateMain={navigateMain}
        navigateOther={navigateOther}
        currentComponent={currentComponent}
        setCurrentComponent={setCurrentComponent}
        openSidebar={openSidebar}
      />
      <div>
        <Navbar />
        <CurrentState />
      </div>
    </div>
  );
}