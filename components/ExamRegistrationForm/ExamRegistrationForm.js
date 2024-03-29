import styles from "./ExamRegistrationForm.module.scss";
import { regFormField } from "../../utils/demoData";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegistration } from "@component/app/Reducers/studentReducer";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { messageClear } from "@component/app/Reducers/studentReducer";
import {
  enlistedSchools,
  enlistedZone,
} from "@component/app/Reducers/schoolReducer";

const ExamRegistrationForm = () => {
  // Import state variable
  const { zoneInfo, schoolInfo } = useSelector((state) => state.school);
  const { isLoading, successMessage, errorMessage } = useSelector(
    (state) => state.student
  );

  // Import by-default functions
  const dispatch = useDispatch();
  const router = useRouter();

  // Set Initial values for UI
  const currentYear = new Date().getFullYear();
  const subject_list = ["poem", "rack", "nock", "shak", "dance"];
  const year_list = ["primary", "first", "second", "third", "forth"];
  const [imageDisplay, setImageDisplay] = useState("");
  const [imageShow, setImageShow] = useState('');
  const [subjectYear, setSubjectYear] = useState([
    { subject: "poem", year: "primary" },
  ]);
  const [zoneValue, setZoneValue] = useState("Dhaka");

  // Function: Add Image files
  const handleImage = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageDisplay(URL.createObjectURL(files[0]));
      setImageShow(files[0]);
    }
  };

  // Function: Add Multiple Subject and Year
  const handleSubjectYear = (e) => {
    setSubjectYear([...subjectYear, { subject: "poem", year: "primary" }]);
    console.log(subjectYear);
    e.preventDefault();
  };

  // Function: Change Subject & year
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const onChangeValue = [...subjectYear];
    onChangeValue[index][name] = value;
    setSubjectYear(onChangeValue);
    e.preventDefault();
  };

  // Function: Delete Subject & year
  const handleDelete = (e, index) => {
    const deleteValue = [...subjectYear];
    deleteValue.splice(index, 1);
    console.log(deleteValue);
    setSubjectYear(deleteValue);
    e.preventDefault();
  };

  // Function: Submit registration form
  const handleRegistrationForm = (e) => {
    const student_name = e.target.student_name.value;
    const father_name = e.target.father_name.value;
    const mother_name = e.target.mother_name.value;
    const birth_date = e.target.birth_date.value;
    const phone_no = e.target.phone_no.value;
    const email = e.target.email.value;
    const zone = e.target.zone.value;
    const school = e.target.school.value;

    const formData = new FormData();
    formData.append('student_name', student_name);
    formData.append('father_name', father_name);
    formData.append('mother_name', mother_name);
    formData.append('birth_date', birth_date);
    formData.append('phone_no', phone_no);
    formData.append('email', email);
    formData.append('zone', zone);
    formData.append('school', school);
    formData.append('imageShow', imageShow);
    formData.append("subjectYear", JSON.stringify(subjectYear));
    // subjectYear.forEach(each => {formData.append("subjectYear[]", each)})
    // for (let i = 0; i < subjectYear.length; i++) {
    //   console.log(subjectYear[i])
    //   formData.append("subjectYear", subjectYear[i]);
    // }
    
    // const state = {
    //   student_name,
    //   father_name,
    //   mother_name,
    //   birth_date,
    //   phone_no,
    //   email,
    //   zone,
    //   school,
    //   imageDisplay,
    //   subjectYear,
    // };

    console.log(subjectYear);
    dispatch(studentRegistration(formData));
    e.preventDefault();
  };

  // Function: Select Zone
  const handleZone = (e) => {
    const zone = e.target.value;
    dispatch(enlistedSchools(zone));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      router.push("/user");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch, router]);

  return (
    <div className={styles.form_design}>
      {/* Heading */}
      <div className={styles.heading_design}>
        <h1 className={styles.institute_name}>Dhruva Parisad</h1>
        <h1 className={styles.reg_no}>Registration No: 0923</h1>
        <div className={styles.date_design}>
          <h1>1430 BS</h1>
          <h1>{currentYear} AD</h1>
        </div>

        <h1 className={styles.exam_title}>
          Examination Registration Form - {currentYear}
        </h1>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleRegistrationForm}>
        <div className={styles.registration_section}>
          {/* Fields: User Info */}
          <div className={styles.user_info_section}>
            {regFormField.map((field, index) => (
              <div key={index} className={styles.field_design}>
                <label htmlFor={field.name}>{field.title}</label>
                <input type={field.type} name={field.name} id="" />
              </div>
            ))}
          </div>

          {/* Fields: Exam Info  */}
          <div className={styles.exam_info_section}>
            <div className={styles.field_design}>
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
            </div>

            {/* Field: school name */}
            <div className={styles.field_design}>
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
            </div>

            {/* Field: Subject year */}
            <div>
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
            </div>

            {/* Image */}
            <h1 className={styles.image_title}>Add Your Image</h1>
            <div className={styles.image_field_design}>
              <label htmlFor="image" className={styles.image_label}>
                {imageDisplay ? (
                  <Image
                    src={imageDisplay}
                    alt=""
                    fill={true}
                    className={styles.image_display}
                  />
                ) : (
                  <>
                    <span className={styles.icon_size}>
                      <CiImageOn />
                    </span>
                    <span>Select Image</span>
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className={styles.image_file}
                placeholder="Image"
                onChange={handleImage}
              />
            </div>
          </div>
        </div>

        {/* File submission button */}
        <div className={styles.button_section}>
          <button className={styles.button_design} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamRegistrationForm;
