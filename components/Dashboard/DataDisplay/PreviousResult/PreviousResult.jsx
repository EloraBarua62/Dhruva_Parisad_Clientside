import { previousResultDisplay } from "@component/app/Reducers/resultReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Pagination/Pagination";
import styles from "./PreviousResult.module.scss";

const PreviousResult = () => {
  const { isLoading, previousData, totalData } = useSelector(
    (state) => state.result
  );
  const [parPage, setParPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const table_heading = [
    "Name",
    "Father Name",
    "Mother Name",
    "Roll",
    "Average Letter Grade",
    "Average Grade Point",
    "Details",
  ];

  const [detailsLength, setDetailsLength] = useState(-1);
  const [toogle, setToogle] = useState(false);

  // Toogle open/close button
  const handleToogle = (index) => {
    setToogle(!toogle);
    if (toogle) setDetailsLength(index);
    else setDetailsLength(-1);
  };
  // Fetch student details
  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(previousResultDisplay(obj));
  }, [currentPage, parPage, dispatch, searchValue]);

  return (
    <div className={styles.previous_data_design}>
      {/* Pagination and searching */}
      <div className={styles.header_section}>
        <div className={styles.heading}>Previous Result</div>
        {/* Pagination */}
        <div className={styles.search_function}>
          <div className={styles.pagination}>
            <p>Page no</p>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalData}
              parPage={parPage}
              showItem={4}
            />
          </div>
          <div className={styles.searchbar}>
            <p>Filter by:</p>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Student name"
            />
          </div>
        </div>
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
        {previousData.map((head, index) => (
          <div
            key={index}
            className={`${
              index % 2 == 0 ? "even_field_design" : "odd_field_design"
            }`}
          >
            {/* Field: Student Roll */}
            <div className="text_details">{head[0]?.student_name}</div>
            {/* Field: Student Roll */}
            <div className="text_details">{head[0]?.father_name}</div>
            {/* Field: Student Roll */}
            <div className="text_details">{head[0]?.mother_name}</div>

            {/* Field: Subjects and Years */}
            {detailsLength === index ? (
              <div className="subject_year_design">
                {head.map((data, idx) =>
                  idx > 0 ? (
                    <div key={idx} className="subject_year_design_inner">
                      <div className="child_box_design">{data?.roll}</div>
                      <div className="child_box_design">
                        {data?.averageLetterGrade}
                      </div>
                      <div className="child_box_design">
                        {data?.averageGradePoint}
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            ) : (
              <div className="subject_year_design">
                <div className="subject_year_design_inner">
                  <div className="child_box_design">{head[1]?.roll}</div>
                  <div className="child_box_design">
                    {head[1]?.averageLetterGrade}
                  </div>
                  <div className="child_box_design">
                    {head[1]?.averageGradePoint}
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

export default PreviousResult;
