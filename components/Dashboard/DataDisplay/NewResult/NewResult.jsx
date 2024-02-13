import Image from "next/image";
import styles from "./NewResult.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resultDisplay, updateWrittenPracticalMarks } from "@component/app/Reducers/resultReducer";
import { MdEdit, MdOutlineDone } from "react-icons/md";

const NewResult = () => {
  const table_heading = [
    "Roll",
    "Name",
    "School ID",
    "Subject",
    "Year",
    "Written",
    "Practical",
    "Total Marks",
    "Grade",
    "Details",
  ];
  let { isLoading, resultInfo } = useSelector((state) => state.result);
  const [detailsLength, setDetailsLength] = useState(-1);
  const [toogle, setToogle] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resultDisplay());
  }, []);

  const handleToogle = (index) => {
    setToogle(!toogle);
    if (toogle) setDetailsLength(index);
    else setDetailsLength(-1);

    // e.preventDefault();
  };

  const handleMarksUpdate = (index, idx, id) => (event) => {
    event.preventDefault();
    console.log(index, idx, id);
    let keepMarks = resultInfo[index].writtenPractical;
    console.log(keepMarks);
    const written = parseInt(event.target.written.value);
    const practical = parseInt(event.target.practical.value);
    const total = parseInt(written + practical);
    const grade = 'A-';
    const excellence = ['Written'];
   
    // const findIdx = keepMarks.findIndex((obj) => obj.id == idx);
    // console.log(keepMarks[idx])
    // {{ ...keepMarks[idx] , written, practical, total, grade, excellence}}
   let obj = {...keepMarks[idx]};
    obj = {...obj, written: written, practical: practical, total: total, grade: grade, excellence: excellence};
    // keepMarks[idx].written = written;
    // keepMarks[idx].practical = practical;
    // keepMarks[idx].total = total;
    // keepMarks[idx].grade = grade;
    // keepMarks[idx].excellence = excellence;

    console.log(obj);
    let array = [...keepMarks];
    array[idx] = obj;
    keepMarks = array;
    console.log(keepMarks);

    let parentObj = { ...resultInfo[index] };
    parentObj = {...parentObj, writtenPractical: keepMarks};
    console.log(parentObj);

    let parentArray = [...resultInfo];
    parentArray[index] = parentObj;
    resultInfo = parentArray;
    console.log(resultInfo);



    if (keepMarks.length === idx + 1) {
      console.log(idx)
      dispatch(updateWrittenPracticalMarks(keepMarks));
    }
  };


  return (
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
      <div>
        {resultInfo.map((head, index) => (
          <div
            key={index}
            className={`${
              index % 2 == 0 ? "even_field_design" : "odd_field_design"
            }`}
          >
            {/* Field: Student Roll */}
            <div className="text_details">{head._id}</div>

            {/* Field: Student Name */}
            <div className="single_details">
              {head.studentInfo?.student_name}
            </div>

            {/* Field: School ID */}
            <div className="single_details">{head.studentInfo?.school}</div>

            {/* Field: Subjects and Years */}
            {detailsLength === index ? (
              <div className="subject_year_design">
                {head.studentInfo?.subjectYear.map((data, idx) => (
                  <div key={idx} className="subject_year_design_inner">
                    <div className="child_box_design">{data.subject}</div>
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

            {/* Field: Subjects and Years */}
            {detailsLength === index ? (
              <div className="subject_year_design">
                {head?.writtenPractical.map((data, idx) => (
                  <>
                    <form
                      onSubmit={handleMarksUpdate(index, idx, head._id)}
                      key={idx}
                      className="subject_year_design_inner"
                    >
                      <input
                        type="number"
                        name="written"
                        className="input_box_design"
                        defaultValue={data.written}
                      />
                      <input
                        type="number"
                        name="practical"
                        className="input_box_design"
                        defaultValue={data.practical}
                      />
                      <button type="submit" className="marks_edit_button">
                        <MdOutlineDone />
                      </button>
                      <div className="child_box_design">
                        {data.written + data.practical}
                      </div>
                      <div className="child_box_design">{data.grade}</div>
                      {/* <input type="submit" value="Update" /> */}
                    </form>
                  </>
                ))}
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
                </div>
              </div>
            )}

            {/* Field: Subjects and Years */}
            {/* {detailsLength === index ? (
              <div className="subject_year_design">
                {head.writtenPractical?.subjectYear.map((data, idx) => (
                  <div key={idx} className="subject_year_design_inner">
                    <div className="child_box_design">{data.subject}</div>
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
            )} */}

            {/* Details checking button */}
            <button
              className="toogle_button_design"
              onClick={() => handleToogle(index)}
            >
              {detailsLength === index ? "Close" : "Open"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewResult;
