import Container from "@component/components/shared/Container/Container";
import styles from "./student_result.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  specificStudentResult,
} from "@component/app/Reducers/resultReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Certificate from "@component/components/Certificate/Certificate";

const StudentResult = () => {
  const {
    isLoading,
    successMessage,
    errorMessage,
    studentResultInfo,
    studentPersonalInfo,
  } = useSelector((state) => state.result);
  const { important_date } = useSelector((state) => state.news);
  const [resultPublishDate, setResultPublishDate] = useState('');

  const today_date = new Date().toISOString();
  const table_heading = [
    "Subject",
    "Year",
    "Written",
    "Practical",
    "Total Marks",
    "Letter Grade",
    "Grade Point"
  ];

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const roll = event.target.roll.value;
    const year = event.target.year.value;
    setResultPublishDate(year);
    dispatch(specificStudentResult({ roll, year }));
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
    <div className={styles.student_result_design}>
      <Container>
        {important_date?.result_date > today_date ? (
          <div className={styles.result_declaration}>
            Result has not published yet. Please check the updated news!{" "}
          </div>
        ) : (
          <div className={styles.result_content}>
            <div className={styles.data_entry}>
              <h1>Enter Student Roll Number</h1>
              <form onSubmit={handleSubmit}>
                <div className={styles.field_design}>
                  <label htmlFor="roll">Roll Number</label>
                  <input type="number" name="roll" id="" />
                </div>
                <div className={styles.field_design}>
                  <label htmlFor="year">Exam year</label>
                  <input type="number" name="year" id="" />
                </div>
                <div className={styles.button_section}>
                  <button className={styles.button_design} type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>

            {studentPersonalInfo &&
            Object.keys(studentPersonalInfo).length !== 0 &&
            studentPersonalInfo.constructor === Object ? (
              <div className={styles.student_info}>
                <div className={styles.other_info}>
                  <div className={styles.title}>Student Result</div>
                  <div className={styles.personal_details_section}>
                    <div>
                      <div style={{marginBottom:'10px'}} className={styles.personal_details}>
                        Name: {studentPersonalInfo?.student_name}
                      </div>
                      <div style={{marginBottom:'10px'}} className={styles.personal_details}>
                        Roll: {studentResultInfo[0]?.roll}
                      </div>
                      <div style={{marginBottom:'10px'}} className={styles.personal_details}>
                        School Name: {studentPersonalInfo?.school}
                      </div>
                    </div>
                    <div>
                      <div style={{marginBottom:'10px'}}>
                        Average Letter Grade:{" "}
                        {studentResultInfo[0]?.averageLetterGrade}
                      </div>
                      <div style={{marginBottom:'10px'}}>
                        Average Grade Point:{" "}
                        {studentResultInfo[0]?.averageGradePoint}
                      </div>
                    </div>
                  </div>

                  <div className={styles.result_details_title}>
                    Result Details
                  </div>

                  <div className={styles.subject_marks_title_display}>
                    {table_heading.map((each, index) => (
                      <div key={index} className={styles.single_field}>
                        {each}
                      </div>
                    ))}
                  </div>

                  {studentResultInfo?.map(
                    (each, index) =>
                      index != 0 && (
                        <div
                          key={index}
                          className={styles.subject_marks_display}
                        >
                          <div className={styles.single_field}>
                            {each.subject}
                          </div>
                          <div className={styles.single_field}>{each.year}</div>
                          <div className={styles.single_field}>
                            {each.written}
                          </div>
                          <div className={styles.single_field}>
                            {each.practical}
                          </div>
                          <div className={styles.single_field}>
                            {each.total}
                          </div>
                          <div className={styles.single_field}>
                            {each.letter_grade}
                          </div>
                          <div className={styles.single_field}>
                            {each.grade_point}
                          </div>
                        </div>
                      )
                  )}
                </div>
                <Certificate
                  resultInfo={studentResultInfo[0]}
                  studentPersonalInfo={studentPersonalInfo}
                  resultPublishDate={resultPublishDate}
                />
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

export default StudentResult;
