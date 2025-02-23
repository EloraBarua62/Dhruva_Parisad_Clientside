import { useEffect, useState } from "react";
import styles from "./SchoolInformation.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfo, enlistedSchools, schoolInformation, updateStatus } from "@component/app/Reducers/schoolReducer";
import { ThreeDots } from "react-loader-spinner";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import Pagination from "../../Pagination/Pagination";

const SchoolInformation = () => {
  const { isLoading, schoolList, totalData } = useSelector((state) => state.school);
  const [selectStatus , setSelectStatus] = useState('all');
  let [schoolDetails, setSchoolDetails] = useState({});
  const statusOptions = [
    { title: "pending", text: "Pending" },
    { title: "confirmed", text: "Confirmed" },
    { title: "blocked", text: "Blocked" },
  ];
  const [parPage, setParPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
    };
    dispatch(schoolInformation(obj));
  }, [currentPage, parPage, dispatch]);

  const hadleStatusChange = (e, id) => {
    const status = e.target.status.value;
    dispatch(updateStatus({status,id}));
    e.preventDefault();
  }
  const handleSchoolDetails = (school) => {
    setSchoolDetails(school);
  };

  const deleteSchoolDetails = (id) => {
    const obj = {id}
    dispatch(deleteInfo(obj));
  }

  return (
    <div className={styles.schoolInfo_design}>
      <h1 className={styles.heading}>School Information</h1>
      {/*Enlisted School  */}
      <div className={styles.school_table}>
        <div className={styles.header_section}>
          <div>
            <label htmlFor="status">Select Status</label>
            <select onChange={(e) => setSelectStatus(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
          <div className={styles.pagination}>
            <div>Page no</div>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalData}
              parPage={parPage}
              showItem={4}
            />
          </div>
        </div>

        <div className={styles.heading_field_design}>
          {table_heading.map((head, index) => (
            <div key={index} className={styles.single_heading}>
              {head}
            </div>
          ))}
        </div>
        <div className={styles.data_field_design}>
          {schoolList
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
                <div className={styles.activity_section}>
                  <button
                    className={styles.update_button}
                    onClick={() => handleSchoolDetails(head)}
                  >
                    <TbListDetails />
                  </button>
                  <button
                    className={styles.delete_button}
                    onClick={() => deleteSchoolDetails(head._id)}
                  >
                    <RiDeleteBinLine />
                  </button>
                </div>
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
            <strong>Principal Name:</strong> {schoolDetails.principalInfo?.name}
          </div>
          <div className={styles.info}>
            <strong>Email:</strong> {schoolDetails.principalInfo?.email}
          </div>
          <div className={styles.info}>
            <strong>Status: </strong> {schoolDetails.status}
          </div>
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
