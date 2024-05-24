import { useDispatch, useSelector } from 'react-redux';
import styles from './NewStudentsDetails.module.scss';
import { useEffect, useState } from 'react';
import { deleteInfo, studentDetails, updateInfo } from '@component/app/Reducers/studentReducer';
import Image from 'next/image';
import { ThreeDots } from 'react-loader-spinner';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Pagination from '../../Pagination/Pagination';

const NewStudentsDetails = () => {
  const { isLoading, studentInfo, totalData } = useSelector(
    (state) => state.student
  );
  const [updateStudentInfo, setUpdateStudentInfo] = useState({});
  const [parPage, setParPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // Payment status
  const statusOptions = [
    { title: "Unpaid"},
    { title: "Paid"},
  ];
  const table_heading = [
    "Roll",
    "Name",
    "Father Name",
    "Mother Name",
    "Zone",
    "School Name",
    "Payment Status",
    "Image",
    "Details",
  ];

  const [state, setState] = useState({
    student_name: "",
    father_name: "",
    mother_name: "",
    phone_no: "",
    payment: ""
  });

  // Button to update student details
  const handleStudentDetails = (student) => {
    setState({
      student_name: student.student_name,
      father_name: student.father_name,
      mother_name: student.mother_name,
      phone_no: student.phone_no,
      payment: student.payment,
    });
    setUpdateStudentInfo(student);
  };

  // Function to update student information
  const handleUpdateInfo = (info) => (e) => {
    e.preventDefault();
    const student_name = state.student_name;
    const father_name = state.father_name;
    const mother_name = state.mother_name;
    const phone_no = state.phone_no;
    const payment = state.payment;
    const data = { ...info, student_name, father_name, mother_name, phone_no, payment };
    dispatch(updateInfo(data));
    setState({
      student_name: "",
      father_name: "",
      mother_name: "",
      phone_no: "",
      payment: ""
    });
    console.log(data);
  };

  // Function to delete student info
  const deleteStudentDetails = (id) => {
    const data = {id};
    console.log(data)
    dispatch(deleteInfo(data));
  }
  
  
  // Fetch student details
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
    };
    dispatch(studentDetails(obj));
  }, [currentPage, parPage, dispatch]);

  return (
    <div className={styles.newresult_design}>
      <h1 className={styles.heading}>Student Details</h1>
      {/* Pagination */}
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
      {/* Table heading */}
      <div className={styles.heading_field_design}>
        {table_heading.map((head, index) => (
          <div key={index} className={styles.single_heading}>
            {head}
          </div>
        ))}
      </div>
      <div className={styles.info_field_design}>
        {studentInfo.map((head, index) => (
          <div
            key={index}
            className={`${
              index % 2 == 0 ? "even_field_design" : "odd_field_design"
            }`}
          >
            <div className="text_details">{head.roll}</div>
            <div className="single_details">{head.student_name}</div>
            <div className="single_details">{head.father_name}</div>
            <div className="single_details">{head.mother_name}</div>
            <div className="single_details">{head.zone}</div>
            <div className="single_details">{head.school}</div>
            <div className="single_details">{head.payment}</div>
            <div className="image_field">
              <Image
                src={head.imageShow}
                alt=""
                fill="true"
                className="image_design"
              />
            </div>
            <div className={styles.activity_section}>
              <button
                className={styles.update_button}
                onClick={() => handleStudentDetails(head)}
              >
                Update
              </button>
              {/* <button className={styles.delete_button} onClick={() => deleteStudentDetails(head._id)}>
                Delete
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {updateStudentInfo &&
      Object.keys(updateStudentInfo).length !== 0 &&
      updateStudentInfo.constructor === Object ? (
        <div className={styles.student_details}>
          <div className={styles.heading_design}>
            <div className={styles.student_head}>Student Information</div>
            <button onClick={() => setUpdateStudentInfo({})}>
              <IoMdCloseCircleOutline className={styles.button_design} />
            </button>
          </div>
          <div className={styles.school_name}>
            School: {updateStudentInfo.school}, {updateStudentInfo.zone}
          </div>
          <form onSubmit={handleUpdateInfo(updateStudentInfo)}>
            <label htmlFor="name">Student Name</label>
            <input
              type="text"
              className={styles.input_field_design}
              name="name"
              defaultValue={updateStudentInfo.student_name}
              onChange={(e) =>
                setState({
                  ...state,
                  student_name: e.target.value,
                })
              }
            />
            <label htmlFor="father_name">Father Name</label>
            <input
              type="text"
              className={styles.input_field_design}
              name="father_name"
              defaultValue={updateStudentInfo.father_name}
              onChange={(e) =>
                setState({
                  ...state,
                  father_name: e.target.value,
                })
              }
            />
            <label htmlFor="mother_name">Mother Name</label>
            <input
              type="text"
              className={styles.input_field_design}
              name="mother_name"
              defaultValue={updateStudentInfo.mother_name}
              onChange={(e) =>
                setState({
                  ...state,
                  mother_name: e.target.value,
                })
              }
            />
            <label htmlFor="phone_no">Phone No</label>
            <input
              type="text"
              className={styles.input_field_design}
              name="phone_no"
              defaultValue={updateStudentInfo.phone_no}
              onChange={(e) =>
                setState({
                  ...state,
                  phone_no: e.target.value,
                })
              }
            />
            <label htmlFor="status">Change Payment Status</label>
            <select
              name="status"
              onChange={(e) =>
                setState({
                  ...state,
                  payment: e.target.value,
                })
              }
            >
              {statusOptions.map((data, index) => (
                <option key={index} value={data.title}>
                  {data.title}
                </option>
              ))}
            </select>

            {/* <div className={styles.field_design}>
                <label htmlFor="zone">Select Your Examination Zone</label>
                <select
                  name="zone"
                  id=""
                  onChange={(e) => setZoneValue(e.target.value)}
                >
                  {zoneInfo.map((zone, index) => (
                    <option key={index} value={zone.name}>
                      {zone.name}
                    </option>
                  ))}
                </select>
              </div> */}

            {/* Field: school name */}
            {/* <div className={styles.field_design}>
                <label htmlFor="school">Select Your Examination school</label>
                <select name="school" id="">
                  {schoolInfo
                    .filter((each) => {
                      if (zoneValue === each.zone) {
                        return each;
                      }
                    })
                    .map((school, index) => (
                      <option key={index} value={school.name}>
                        {school.name}
                      </option>
                    ))}
                </select>
              </div> */}

            {/* Field: Subject year */}
            {/* <div>
                <h1 className={styles.image_title}>Select Subjects & Years </h1>
                {subjectYear.map((data, index) => (
                  <div key={index} className={styles.sub_year_content}>
                    <select
                      name="subject"
                      id=""
                      value={data.subject}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {subject_list.map((subject, i) => (
                        <option key={i} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <select
                      name="year"
                      id=""
                      value={data.year}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {year_list.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <button
                      className={styles.delete_button}
                      onClick={(e) => handleDelete(e, index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleSubjectYear}
                  className={styles.addition_button}
                >
                  Add More
                </button>
              </div> */}

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

export default NewStudentsDetails;