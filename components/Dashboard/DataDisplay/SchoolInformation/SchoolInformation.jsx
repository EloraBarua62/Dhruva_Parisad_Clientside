import { useEffect } from "react";
import styles from "./SchoolInformation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { enlistedSchools } from "@component/app/Reducers/schoolReducer";
import { schoolInformField } from "@component/utils/demoData";

const SchoolInformation = () => {
  const { schoolInfo } = useSelector((state) => state.school);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(enlistedSchools());
  }, []);

  const handleChange = (e) => {
    const status_name = e.target.status.value;
    let displaySchool = schoolInfo.filter(
      (data) => data.status === status_name
    );
    e.preventDefault();
  };

  return (
    <div className={styles.schoolInfo_design}>
      {/*Enlisted School  */}
      <div>
        <div>
          <label htmlFor="status">Select Status</label>
          <select name="status" onChange={(e) => handleChange(e)}>
            <option key="pending" value="pending">
              Pending
            </option>
            <option key="confirmed" value="confirmed">
              Confirmed
            </option>
            <option key="blocked" value="blocked">
              Blocked
            </option>
          </select>
        </div>
        <div className={styles.school_table}></div>
      </div>

      {/* School Registration */}
      <div className={styles.school_registration_table}>
        <form></form>
      </div>
    </div>
  );
};

export default SchoolInformation;
