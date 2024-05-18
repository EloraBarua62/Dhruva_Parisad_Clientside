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
import { ThreeDots } from "react-loader-spinner";
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from "jspdf-invoice-template";
import { PDFViewer } from "@react-pdf/renderer";
import PdfDocument from "../PdfDocument/PdfDocument";
import Admitcard from "../AdmitCard/AdmitCard";



const ExamRegistrationForm = () => {
  // Import state variable
  const { zoneInfo, schoolInfo } = useSelector((state) => state.school);
  const { isLoading, successMessage, errorMessage, studentDetail, exam_date } =
    useSelector((state) => state.student);

  // Import by-default functions
  const dispatch = useDispatch();

  // Set Initial values for UI
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDay();
  let currentBanglaYear = currentYear - 594;
  if (month >= 3 && day >= 15) ++currentBanglaYear;

  const subject_list = [
    "Rhyme",
    "Patriotic Song",
    "Rabindra Sangeet",
    "Nazrul Sangeet",
    "Folk Song",
    "Classical Music",
    "Recitation(Abrtti)",
    "Tabla",
    "Dance",
    "Fine Arts",
  ];
  const year_list = [
    "Primary",
    "First",
    "Second",
    "Third",
    "Forth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
  ];
  const [imageDisplay, setImageDisplay] = useState("");
  const [imageShow, setImageShow] = useState("");
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
  // const [AdmitCardInfo, setAdmitCardInfo] = useState({});
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
    formData.append("student_name", student_name);
    formData.append("father_name", father_name);
    formData.append("mother_name", mother_name);
    formData.append("birth_date", birth_date);
    formData.append("phone_no", phone_no);
    formData.append("email", email);
    formData.append("zone", zone);
    formData.append("school", school);
    formData.append("imageShow", imageShow);
    formData.append("subjectYear", JSON.stringify(subjectYear));

    // setAdmitCardInfo({
    //   currentYear,
    //   student_name,
    //   father_name,
    //   mother_name,
    //   school,
    //   subjectYear,
    // })
    dispatch(studentRegistration(formData));
    e.preventDefault();
  };

  // PDF generator
  // const generatePdf = (info, date) => {
  //   console.log(info, date);

  //   var props = {
  //     outputType: OutputType.Save,
  //     returnJsPDFDocObject: true,
  //     fileName: "Examination Admit Card",
  //     orientationLandscape: false,
  //     compress: true,
  //     logo: {
  //       src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
  //       type: "PNG", //optional, when src= data:uri (nodejs case)
  //       width: 53.33, //aspect ratio = width/height
  //       height: 26.66,
  //       margin: {
  //         top: 0, //negative or positive num, from the current position
  //         left: 0, //negative or positive num, from the current position
  //       },
  //     },
  //     business: {
  //       name: info.student_name,
  //       address: "0923",
  //       phone: date.exam_date,
  //     },
  //     contact: {
  //       label: "This admit card is issued for:",
  //       name: info.student_name,
  //       address: info.father_name,
  //       phone: info.mother_name,
  //       num: info.roll,
  //       otherInfo: info.school,
  //     },
  //     // invoice: {
  //     //   label: "Photo",
  //     //   // src: info.imageShow,
  //     //   // type: "PNG", //optional, when src= data:uri (nodejs case)
  //     //   // width: 53.33, //aspect ratio = width/height
  //     //   // height: 26.66,
  //     //   // margin: {
  //     //   //   top: 0, //negative or positive num, from the current position
  //     //   //   left: 0, //negative or positive num, from the current position
  //     //   // },
  //     //   headerBorder: false,
  //     //   tableBodyBorder: false,
  //     //   header: [
  //     //     {
  //     //       title: "#",
  //     //       style: {
  //     //         width: 10,
  //     //       },
  //     //     },
  //     //     {
  //     //       title: "Subject",
  //     //       style: {
  //     //         width: 30,
  //     //       },
  //     //     },
  //     //     {
  //     //       title: "Year",
  //     //       style: {
  //     //         width: 30,
  //     //       },
  //     //     },
  //     //   ],
  //     //   table: Array.from(Array(4), (sub_year, index) => [
  //     //     index + 1,
  //     //     sub_year?.subject,
  //     //     sub_year?.year,
  //     //   ]),
  //     // },
  //     footer: {
  //       text: "Please bring the admit card on examination day.",
  //     },
  //     pageEnable: true,
  //     pageLabel: "Page ",
  //   };

  //   const pdfObject = jsPDFInvoiceTemplate(props);
  // };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className={styles.form_design}>
      {/* Heading */}
      <div className={styles.heading_design}>
        <h1 className={styles.institute_name}>Dhruva Parisad</h1>
        <h1 className={styles.reg_no}>Registration No: 0923</h1>
        <div className={styles.date_design}>
          <h1>{currentBanglaYear} BS</h1>
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
              <label htmlFor="school">Select Your Examination Center</label>
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

      {isLoading && (
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
      )}

      {studentDetail &&
      Object.keys(studentDetail).length !== 0 &&
      studentDetail.constructor === Object ? (
        <Admitcard studentDetail={studentDetail} exam_date={exam_date} />
      ) : (
        // <PDFViewer width={"100%"} height={"700px"}>
        //   <PdfDocument studentDetail={studentDetail} exam_date={exam_date}/>
        // </PDFViewer>
        ""
      )}
    </div>
  );
};

export default ExamRegistrationForm;
