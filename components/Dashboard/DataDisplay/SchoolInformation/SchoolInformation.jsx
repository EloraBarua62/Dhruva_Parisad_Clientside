import { useEffect, useState } from "react";
import styles from "./SchoolInformation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { enlistedSchools, updateStatus } from "@component/app/Reducers/schoolReducer";
import { schoolInformField } from "@component/utils/demoData";
import Image from "next/image";
import { ThreeDots } from "react-loader-spinner";
import { IoMdCloseCircleOutline } from "react-icons/io";

const SchoolInformation = () => {
  const { isLoading,schoolInfo } = useSelector((state) => state.school);
  const [selectStatus , setSelectStatus] = useState('all');
  let [schoolDetails, setSchoolDetails] = useState({});
  const statusOptions = [
    { title: "pending", text: "Pending" },
    { title: "confirmed", text: "Confirmed" },
    { title: "blocked", text: "Blocked" },
  ];
  const dispatch = useDispatch();

  const table_heading = [
    "School Id",
    "School Name",
    "Zone",
    "Principal Name",
    "Email",
    "Details",
  ];
  useEffect(() => {
      dispatch(enlistedSchools("all"));
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

        <div className={styles.heading_field_design}>
          {table_heading.map((head, index) => (
            <div key={index} className={styles.single_heading}>
              {head}
            </div>
          ))}
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
                <div className="text_details">{head?.school_code}</div>
                <div className="text_details">{head?.school_name}</div>
                <div className="text_details">{head?.zone}</div>
                <div className="text_details">{head?.principalInfo?.name}</div>
                <div className="text_details">{head?.principalInfo?.email}</div>
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
          <div className={styles.heading_design}>
            <div className={styles.school_head}>School Information</div>
            <button onClick={() => setSchoolDetails({})}>
              <IoMdCloseCircleOutline className={styles.button_design} />
            </button>
          </div>
          <div className={styles.school_name}>
            {schoolDetails.school_name}, {schoolDetails.zone}
          </div>
          <div className={styles.school_code}>
            School Code: <span>{schoolDetails.school_code}</span>
          </div>
          <div className={styles.info}>
            Principal Name: {schoolDetails.principalInfo?.name}
          </div>
          <div className={styles.info}>
            Email: {schoolDetails.principalInfo?.email}
          </div>
          <div className={styles.info}>Status: {schoolDetails.status}</div>
          <div className={styles.status}>Change Status</div>
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
            <button
              className={styles.submit_button}
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Update"
              )}
            </button>
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
