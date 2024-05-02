import styles from "./NewResult.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resultDisplay,
  updateWrittenPracticalMarks,
} from "@component/app/Reducers/resultReducer";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "../../Pagination/Pagination";

const NewResult = () => {
  const table_heading = [
    "Roll",
    "Name",
    "School Code",
    "Subject",
    "Year",
    "Written",
    "Practical",
    "Total Marks",
    "Grade",
    "Details",
  ];

  let { isLoading, resultInfo, totalData } = useSelector((state) => state.result);
  const [detailsLength, setDetailsLength] = useState(-1);
  const [writtenPracticalState, setWrittenPracticalState] = useState([]);
  const [editDoneFieldIdx, setEditDoneFieldIdx] = useState(-1);
  const [editDoneSingleIdx, setEditDoneSingleIdx] = useState(-1);
  const [toogleEditDoneButton, setToogleEditDoneButton] = useState(true);
  const [toogle, setToogle] = useState(false);

  const [parPage, setParPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
    };
    dispatch(resultDisplay(obj));
  }, [currentPage, parPage, dispatch]);

  const handleToogle = (index) => {
    setToogle(!toogle);
    if (toogle) setDetailsLength(index);
    else setDetailsLength(-1);
  };

  const handleEditDoneButton = (index, idx) => {
    setEditDoneFieldIdx(index);
    setEditDoneSingleIdx(idx);
    setToogleEditDoneButton(!toogleEditDoneButton);
  };

  // const [state, setState] = useState({
  //   written: 0,
  //   practical: 0,
  //   total: 0,
  //   grade: '',
  //   excellence: [],
  // })
  const handleMarksEdit = (event, index, idx) => {
    event.preventDefault();
    let keepMarks;
    if (writtenPracticalState.length === 0)
      keepMarks = resultInfo[index].writtenPractical;
    else keepMarks = writtenPracticalState;

    // console.log(keepMarks);
    // console.log(event.target)
    // const written = event.target.written;
    // const practical = event.target.practical;
    // console.log(written, practical)
    const value = parseInt(event.target.value);
    const obj = { ...keepMarks[idx], [event.target.name]: value };
    // obj = { ...obj, written: written, practical: practical };
    let array = [...keepMarks];
    array[idx] = obj;
    keepMarks = array;
    setWrittenPracticalState([...keepMarks]);
    console.log(keepMarks);
  };

  const handleMarksSubmit = (index, id) => (event) => {
    event.preventDefault();
    const writtenPractical = { writtenPractical: writtenPracticalState };
    dispatch(updateWrittenPracticalMarks({ index, id, writtenPractical }));
    setWrittenPracticalState([]);
  };

  return (
    <div className={styles.newresult_design}>
      <h1 className={styles.heading}>New Result</h1>

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
              {head.studentInfo?.school_code}
            </div>

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

            {/* Field: Written and Practical */}
            {detailsLength === index ? (
              <div className="subject_year_design">
                {/* Result update form for single user */}
                <form onSubmit={handleMarksSubmit(index, head._id)}>
                  {head?.writtenPractical.map((data, idx) => (
                    <div key={idx} className="subject_year_design_inner">
                      {/* Field: Writtern marks */}
                      <input
                        type="number"
                        name="written"
                        className="input_box_design"
                        defaultValue={data.written}
                        onChange={(e) => handleMarksEdit(e, index, idx)}
                      />

                      {/* Field: Practical marks */}
                      <input
                        type="number"
                        name="practical"
                        className="input_box_design"
                        defaultValue={data.practical}
                        onChange={(e) => handleMarksEdit(e, index, idx)}
                      />

                      {/* Displaying total score of written and practical  */}
                      <div className="child_box_design">
                        {data.written + data.practical}
                      </div>

                      {/* Displaying final grade of written and practical  */}
                      <div className="child_box_design">{data.grade}</div>
                    </div>
                  ))}
                  <button type="submit" disabled={isLoading ? true : false}>
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
  );
};

export default NewResult;
