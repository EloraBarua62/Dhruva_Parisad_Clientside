import Image from 'next/image';
import styles from './Sidebar.module.scss';
import profile_pic from '../../../public/profile.png'
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({
  navigateMain,
  navigateOther,
  setCurrentComponent,
}) => {
  console.log(navigateMain);
  const admin_profile = "";
  return (
      <div className={styles.sidebar_design}>
        {/* Heading */}
        <div className={styles.sidebar_title_design}>
            <h1 className={styles.sidebar_heading}>Dhruva Parisad</h1>
            <h1 className={styles.sidebar_subheading}>Admin Dashboard</h1>
        </div>

        {/* Admin Profile */}
        <div className={styles.admin_profile}>
          {/* Admin image */}
          <div className={styles.image_design}>
            {admin_profile?.image ? (
              <Image
                src={admin_profile.image}
                alt=""
                className={styles.image_sizing}
              />
            ) : (
              <Image src={profile_pic} alt="" className={styles.image_sizing} />
            )}
          </div>

          {/* Admin info */}
          <div className={styles.user_info_design}>
            <h1 className={styles.name}>User Name</h1>
            <h1 className={styles.role}>admin</h1>
          </div>

          {/* Action: Edit */}
          <button>Edit</button>
        </div>

        {/* Main Menu */}
        <div className={styles.navigation_design}>
          <h1 className={styles.navigation_heading}>Main Menu</h1>

          {/* Menus */}
          <div className={styles.navigation_fields}>
            {navigateMain.map((menu, index) => (
              <button
                key={index}
                className={styles.separate_field}
                onClick={() => setCurrentComponent(menu.datatable)}
              >
                {menu.title}
              </button>
            ))}
          </div>
        </div>

        {/* Other Menu */}
        <div className={styles.navigation_design}>
          <h1 className={styles.navigation_heading}>Other</h1>

          {/* Menus */}
          <div className={styles.navigation_fields}>
            {navigateOther.map((menu, index) => (
              <button
                key={index}
                className={styles.separate_field}
                onClick={() => setCurrentComponent(menu.datatable)}
              >
                {menu.title}
              </button>
            ))}
          </div>
        </div>

        <button className={styles.logout_design}>Log Out</button>
      </div>

  );
};

export default Sidebar;