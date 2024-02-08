import Image from 'next/image';
import styles from './Sidebar.module.scss';
import profile_pic from '../../../public/profile.png'

const Sidebar = ({
  role,
  navigateMain,
  navigateOther,
  currentComponent,
  setCurrentComponent,
  openSidebar,
}) => {
  console.log(navigateMain)
  const admin_profile=''
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
    </div>
  );
};

export default Sidebar;