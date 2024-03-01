import styles from "./ExamRegistrationForm.module.scss";
import {regFormField} from "../../utils/demoData";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentRegistration } from "@component/app/Reducers/studentReducer";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { messageClear } from "@component/app/Reducers/authReducer";
import { enlistedSchools, enlistedZone } from "@component/app/Reducers/schoolReducer";

const ExamRegistrationForm = () => {
  const { zoneInfo, schoolInfo } = useSelector((state) => state.school);
  const { isLoading, successMessage, errorMessage } = useSelector(
    (state) => state.student
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  // const school_list = [
  //   "Dhaka school",
  //   "Chittagong school",
  //   "Jashor school",
  //   "Barishal school",
  // ];
  const subject_list = ["poem", "rack", "nock", "shak", "dance"];
  const year_list = ["primary", "first", "second", "third", "forth"];
  const [imageShow, setImageShow] = useState("");
  const [subjectYear, setSubjectYear] = useState([
    { subject: "poem", year: "primary" },
  ]);
  

  const handleImage = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      // setState({ ...state, image: files[0] });
    }
  };

  const handleSubjectYear = (e) => {
    setSubjectYear([...subjectYear, { subject: "poem", year: "primary" }]);
    console.log(subjectYear);
    e.preventDefault();
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const onChangeValue = [...subjectYear];
    onChangeValue[index][name] = value;
    setSubjectYear(onChangeValue);
    console.log(subjectYear);
    e.preventDefault();
  };

  const handleDelete = (e, index) => {
    const deleteValue = [...subjectYear];
    deleteValue.splice(index, 1);
    console.log(deleteValue);
    setSubjectYear(deleteValue);
    e.preventDefault();
  };

  const handleRegistrationForm = (e) => {
    const student_name = e.target.student_name.value;
    const father_name = e.target.father_name.value;
    const mother_name = e.target.mother_name.value;
    const birth_date = e.target.birth_date.value;
    const phone_no = e.target.phone_no.value;
    const email = e.target.email.value;
    const zone = e.target.zone.value;
    const school = e.target.school.value;
    const state = {
      student_name,
      father_name,
      mother_name,
      birth_date,
      phone_no,
      email,
      zone,
      school,
      imageShow,
      subjectYear,
    };

    console.log(state);
    dispatch(
      studentRegistration({
        student_name,
        father_name,
        mother_name,
        birth_date,
        phone_no,
        email,
        zone,
        school,
        imageShow,
        subjectYear,
      })
    );
    e.preventDefault();
  };

  const handleZone = (e) => {
    const zone = e.target.value;
    dispatch(enlistedSchools(zone));
  }

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
              <select name="zone" id="" onChange={(e) => handleZone(e)}>
                {zoneInfo.map((zone, index) => (
                  <option key={index} value={zone.name}>
                    {zone.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field_design}>
              <label htmlFor="school">Select Your Examination school</label>
              <select name="school" id="">
                {schoolInfo?.map((school, index) => (
                  <option key={index} value={school.name}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h1 className={styles.image_title}>Add Your Image</h1>
              {subjectYear.map((data, index) => (
                <div key={index}>
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
                  <button onClick={(e) => handleDelete(e, index)}>
                    Delete
                  </button>
                </div>
              ))}
              <button onClick={handleSubjectYear}>Add More</button>
            </div>

            {/* Image */}
            <h1 className={styles.image_title}>Add Your Image</h1>
            <div className={styles.image_field_design}>
              <label htmlFor="image" className={styles.image_label}>
                {imageShow ? (
                  <Image
                    src={imageShow}
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
