import Container from "@component/components/shared/Container/Container";
import styles from "./student_result.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  specificStudentResult,
} from "@component/app/Reducers/resultReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";

const StudentResult = () => {
  const { isLoading, successMessage, errorMessage, studentResultInfo } =
    useSelector((state) => state.result);

  const table_heading = [
    "Subject",
    "Year",
    "Written",
    "Practical",
    "Total Marks",
    "Grade",
    "Excellence",
  ];

  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    const roll = event.target.roll.value;
    dispatch(specificStudentResult({ roll }));
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
        <div className={styles.result_content}>
          <div className={styles.data_entry}>
            <h1>Enter Student Roll Number</h1>
            <form onSubmit={handleSubmit}>
              <div className={styles.field_design}>
                <label htmlFor="roll">Roll Number</label>
                <input type="number" name="roll" id="" />
              </div>
              <div className={styles.button_section}>
                <button className={styles.button_design} type="submit">
                  Search
                </button>
              </div>
            </form>
          </div>

          {studentResultInfo &&
          Object.keys(studentResultInfo).length !== 0 &&
          studentResultInfo.constructor === Object ? (
            <div className={styles.student_info}>
              <div className={styles.other_info}>
                <div className={styles.title}>Student Result</div>
                <div className={styles.personal_details}>
                  Name: {studentResultInfo?.studentInfo?.student_name}
                </div>
                <div className={styles.personal_details}>
                  Roll: {studentResultInfo?.studentInfo?.roll}
                </div>
                <div className={styles.personal_details}>
                  School Code: {studentResultInfo?.studentInfo?.school_code}
                </div>
                <div className={styles.personal_details_title}>
                  Result Details
                </div>

                <div className={styles.subject_marks_title_display}>
                  {table_heading.map((each, index) => (
                    <div key={index} className={styles.single_field}>
                      {each}
                    </div>
                  ))}
                </div>

                {studentResultInfo?.studentInfo?.subjectYear.map(
                  (each, index) => (
                    <div key={index} className={styles.subject_marks_display}>
                      <div className={styles.single_field}>{each.subject}</div>
                      <div className={styles.single_field}>{each.year}</div>
                      <div className={styles.single_field}>
                        {studentResultInfo?.writtenPractical[index]?.written}
                      </div>
                      <div className={styles.single_field}>
                        {studentResultInfo?.writtenPractical[index]?.practical}
                      </div>
                      <div className={styles.single_field}>
                        {studentResultInfo?.writtenPractical[index]?.total}
                      </div>
                      <div className={styles.single_field}>
                        {studentResultInfo?.writtenPractical[index]?.grade}
                      </div>
                      <div className={styles.single_field}>
                        {
                          studentResultInfo?.writtenPractical[index]
                            ?.excellence[0]
                        }
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

export default StudentResult;
