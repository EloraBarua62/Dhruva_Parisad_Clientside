import styles from './AdminPanel.module.scss';
import { useEffect, useState } from 'react';

const AdminPanel = () => {

  const [principalInfo, setPrincipalInfo] = useState([]);

  useEffect(()=>{
    if (typeof window !== "undefined") {
      const listInfo = JSON.parse(window.localStorage.getItem("principalInfo"));
      setPrincipalInfo(listInfo);
    }   
  },[])
  
  const table_heading = [
    "Name",
    "Email",
    "Password",
  ];
    return (
      <div className={styles.admin_panel_design}>
        <h1>Principal Information</h1>
        <div className={styles.heading_field_design}>
          {table_heading.map((head, index) => (
            <div key={index} className={styles.single_heading}>
              {head}
            </div>
          ))}
        </div>
        <div className={styles.info_field_design}>
          {principalInfo.map((head, index) => (
            <div
              key={index}
              className={`${
                index % 2 == 0 ? "even_field_design" : "odd_field_design"
              }`}
            >
              <div className="text_details">{head.name}</div>
              <div className="single_details">{head.email}</div>
              <div className="single_details">{head.pin_number}</div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default AdminPanel;