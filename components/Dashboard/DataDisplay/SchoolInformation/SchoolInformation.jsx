import { useEffect, useState } from "react";
import styles from "./SchoolInformation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { enlistedSchools, updateStatus } from "@component/app/Reducers/schoolReducer";
import { schoolInformField } from "@component/utils/demoData";
import Image from "next/image";

const SchoolInformation = () => {
  const { schoolInfo } = useSelector((state) => state.school);
  const [selectStatus , setSelectStatus] = useState('all');
  let [schoolDetails, setSchoolDetails] = useState({});
  const statusOptions = [
    { title: "pending", text: "Pending" },
    { title: "confirmed", text: "Confirmed" },
    { title: "blocked", text: "Blocked" },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(enlistedSchools('all'));
  }, []);

  const hadleStatusChange = (e, id) => {
    const status = e.target.status.value;
    dispatch(updateStatus({status,id}));
    e.preventDefault();
  }
  const handleSchoolDetails = (school) => {
    setSchoolDetails(school);
  };

  return (
    <div className={styles.schoolInfo_design}>
      {/*Enlisted School  */}
      <div className={styles.school_table}>
        <div>
          <label htmlFor="status">Select Status</label>
          <select onChange={(e) => setSelectStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <div>
          {schoolInfo
            .filter((each) => {
              if (selectStatus === each.status || selectStatus === "all") {
                return each;
              }
            })
            .map((head, index) => (
              <div
                key={index}
                className={`${
                  index % 2 == 0 ? "even_field_design" : "odd_field_design"
                }`}
              >
                <div className="text_details">{head.school_code}</div>
                <div className="text_details">{head.school_name}</div>
                <div className="text_details">{head.zone}</div>
                <div className="text_details">{head.principalInfo.name}</div>
                <div className="text_details">{head.principalInfo.email}</div>
                <button onClick={() => handleSchoolDetails(head)}>
                  details
                </button>
              </div>
            ))}
        </div>
      </div>
      {schoolDetails &&
      Object.keys(schoolDetails).length !== 0 &&
      schoolDetails.constructor === Object ? (
        <div className={styles.school_details}>
          <div className="text_details">{schoolDetails.school_code}</div>
          <div className="text_details">{schoolDetails.school_code}</div>
          <div className="text_details">{schoolDetails.school_name}</div>
          <div className="text_details">{schoolDetails.zone}</div>
          <div className="text_details">
            {schoolDetails.principalInfo?.name}
          </div>
          <div className="text_details">
            {schoolDetails.principalInfo?.email}
          </div>
          <div className="text_details">{schoolDetails.status}</div>
          <h1>Change Status</h1>
          <form onSubmit={(e) => hadleStatusChange(e, schoolDetails._id)}>
            <label htmlFor="status">Select Status</label>
            <select name="status">
              {statusOptions.map(
                (data, index) =>
                  schoolDetails.status != data.title && (
                    <option key={index} value={data.title}>
                      {data.text}
                    </option>
                  )
              )}
            </select>
            <input type="submit" value="Update" />
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SchoolInformation;

//  
