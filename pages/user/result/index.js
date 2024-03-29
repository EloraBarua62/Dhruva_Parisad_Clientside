import { specificResultDisplay } from "@component/app/Reducers/resultReducer";
import styles from "./result.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Container from "@component/components/shared/Container/Container";
import { toast } from "react-hot-toast";
import {
  messageClear,
} from "@component/app/Reducers/resultReducer";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";

const Result = () => {
  const { isLoading, successMessage, errorMessage, resultInfo } = useSelector((state) => state.result);
  const dispatch = useDispatch();
  const [detailsLength, setDetailsLength] = useState(-1);
  const [toogle, setToogle] = useState(false);

  const table_heading = [
    "Roll",
    "Name",
    "School",
    "Subject",
    "Year",
    "Written",
    "Practical",
    "Total Marks",
    "Grade",
    "Details",
  ];
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const school_code = event.target.school_code.value;
    dispatch(specificResultDisplay({ school_code }));
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
        <div>
          <h1>Enter School Code</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="school_code">School Id</label>
            <input type="number" name="school_code" id="" />
            <input type="submit" value="Submit" />
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
                      index % 2 == 0 ? "even_field_design" : "odd_field_design"
                    }`}
                  >
                    {/* Field: Student Roll */}
                    <div className="text_details">{head.studentInfo.roll}</div>

                    {/* Field: Student Name */}
                    <div className="single_details">
                      {head.studentInfo?.student_name}
                    </div>

                    {/* Field: School ID */}
                    <div className="single_details">
                      {head.studentInfo?.school}
                    </div>

                    {/* Field: Subjects and Years */}
                    {detailsLength === index ? (
                      <div className="subject_year_design">
                        {head.studentInfo?.subjectYear.map((data, idx) => (
                          <div key={idx} className="subject_year_design_inner">
                            <div className="child_box_design">
                              {data.subject}
                            </div>
                            <div className="child_box_design">{data.year}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="subject_year_design">
                        <div className="subject_year_design_inner">
                          <div className="child_box_design">
                            {head.studentInfo?.subjectYear[0].subject}
                          </div>
                          <div className="child_box_design">
                            {head.studentInfo?.subjectYear[0].year}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Field: Written and Practical */}
                    {detailsLength === index ? (
                      <div className="subject_year_design">
                        {/* Result update form for single user */}
                        <div>
                          {head?.writtenPractical.map((data, idx) => (
                            <div
                              key={idx}
                              className="subject_year_design_inner"
                            >
                              <div>{data.written}</div>
                              <div>{data.practical}</div>

                              {/* Displaying total score of written and practical  */}
                              <div className="child_box_design">
                                {data.written + data.practical}
                              </div>

                              {/* Displaying final grade of written and practical  */}
                              <div className="child_box_design">
                                {data.grade}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="subject_year_design">
                        <div className="subject_year_design_inner">
                          <div className="child_box_design">
                            {head?.writtenPractical[0].written}
                          </div>
                          <div className="child_box_design">
                            {head?.writtenPractical[0].practical}
                          </div>
                          <div className="child_box_design">
                            {head?.writtenPractical[0].written +
                              head?.writtenPractical[0].practical}
                          </div>
                          <div className="child_box_design">
                            {head?.writtenPractical[0].grade}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Details checking button */}
                    <div className="button_content">
                      <button
                        className="toogle_button_design"
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
      </Container>
    </div>
  );
};

export default Result;
