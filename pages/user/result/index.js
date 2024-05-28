import styles from "./result.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Container from "@component/components/shared/Container/Container";
import { toast } from "react-hot-toast";
import {
  messageClear, specificSchoolResult,
} from "@component/app/Reducers/resultReducer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";

const Result = () => {
  const { isLoading, successMessage, errorMessage, resultInfo } = useSelector((state) => state.result);
  const dispatch = useDispatch();
  const [detailsLength, setDetailsLength] = useState(-1);
  const [toogle, setToogle] = useState(false);
  const { important_date } = useSelector((state) => state.news);
  const today_date = new Date().toISOString();

  const table_heading = [
    "Roll",
    "Name",
    "Subject",
    "Year",
    "Written",
    "Practical",
    "Total Marks",
    "Letter Grade",
    "Grade Point",
    "Details",
  ];
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const school_code = event.target.school_code.value;
    dispatch(specificSchoolResult({ school_code }));
  };

  const handleToogle = (index) => {
    setToogle(!toogle);
    if (toogle) setDetailsLength(index);
    else setDetailsLength(-1);
  };

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
    <div className={styles.result_design}>
      <Container>
        {important_date > today_date ? (
          <div className={styles.result_declaration}>
            Result has not published yet. Please check the updated news!{" "}
          </div>
        ) : (
          <div className={styles.result_content}>
            <h1>Enter School Code</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.field_design}>
                <label htmlFor="school_code">School Id</label>
                <input type="number" name="school_code" id="" />
              </div>
              <div className={styles.button_section}>
                <button className={styles.button_design} type="submit">
                  Search
                </button>
              </div>
            </form>

            {resultInfo.length > 0 ? (
              <div className={styles.newresult_design}>
                {/* Table heading */}
                <div className={styles.heading_field_design}>
                  {table_heading.map((head, index) => (
                    <div key={index} className={styles.single_heading}>
                      {head}
                    </div>
                  ))}
                </div>

                {/* Table data */}
                <div className={styles.info_field_design}>
                  {/* Displaying information of each student */}
                  {resultInfo.map((head, index) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 == 0
                          ? `${styles.even_field_design}`
                          : `${styles.odd_field_design}`
                      }`}
                    >
                      {/* Field: Student Roll */}
                      <div className={styles.text_details}>
                        {head.studentInfo.roll}
                      </div>
                      {/* Field: Student Name */}
                      <div className={styles.single_details}>
                        {head.studentInfo?.student_name}
                      </div>

                      {/* Field: Subjects and Years */}
                      {detailsLength === index ? (
                        <div className={styles.subject_year_design}>
                          {head.studentInfo?.subjectYear.map((data, idx) => (
                            <div
                              key={idx}
                              className={styles.subject_year_design_inner}
                            >
                              <div className={styles.child_box_design}>
                                {data.subject}
                              </div>
                              <div className={styles.child_box_design}>
                                {data.year}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.subject_year_design}>
                          <div className={styles.subject_year_design_inner}>
                            <div className={styles.child_box_design}>
                              {head.studentInfo?.subjectYear[0].subject}
                            </div>
                            <div className={styles.child_box_design}>
                              {head.studentInfo?.subjectYear[0].year}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Field: Written and Practical */}
                      {detailsLength === index ? (
                        <div className={styles.subject_year_design}>
                          {/* Result update form for single user */}
                          {head?.writtenPractical.map((data, idx) => (
                            <div
                              key={idx}
                              className={styles.subject_year_design_inner}
                            >
                              <div className={styles.child_box_design}>
                                {data.written}
                              </div>
                              <div className={styles.child_box_design}>
                                {data.practical}
                              </div>

                              {/* Displaying total score of written and practical  */}
                              <div className={styles.child_box_design}>
                                {data.written + data.practical}
                              </div>

                              {/* Displaying final grade of written and practical  */}
                              <div className={styles.child_box_design}>
                                {data.letter_grade}
                              </div>
                              {/* Displaying final grade of written and practical  */}
                              <div className={styles.child_box_design}>
                                {data.grade_point}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.subject_year_design}>
                          <div className={styles.subject_year_design_inner}>
                            <div className={styles.child_box_design}>
                              {head?.writtenPractical[0].written}
                            </div>
                            <div className={styles.child_box_design}>
                              {head?.writtenPractical[0].practical}
                            </div>
                            <div className={styles.child_box_design}>
                              {head?.writtenPractical[0].written +
                                head?.writtenPractical[0].practical}
                            </div>
                            <div className={styles.child_box_design}>
                              {head?.writtenPractical[0].letter_grade}
                            </div>
                            <div className={styles.child_box_design}>
                              {head?.writtenPractical[0].grade_point}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Details checking button */}
                      <div className={styles.button_content}>
                        <button
                          className={styles.toogle_button_design}
                          onClick={() => handleToogle(index)}
                        >
                          {detailsLength === index ? "Close" : "Open"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Result;
