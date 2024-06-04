import { previousResultDisplay } from "@component/app/Reducers/resultReducer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../Pagination/Pagination";
import styles from "./PreviousResult.module.scss";

const PreviousResult = () => {
  let { isLoading, previousData, previousPersonalData, totalData } = useSelector(
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
    "Average Letter Grade",
    "Average Grade Point",
  ];

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
    <div className={styles.old_result_design}>
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
            <div className={styles.search_fields}>
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Email Address"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
       {previousData.map((each,index) => {
        <div></div>
       })}
      </div>
    
    </div>
  );
};

export default PreviousResult;


//   <div className={styles.info_field_design}>
//     {/* Displaying information of each student */}
//     {resultInfo.map((head, index) => (
//       <div
//         key={index}
//         className={`${
//           index % 2 == 0 ? "even_field_design" : "odd_field_design"
//         }`}
//       >
//         {/* Field: Student Roll */}
//         <div className="text_details">{head?.studentInfo?.roll}</div>

//         {/* Field: Student Name */}
//         <div className="single_details">{head?.studentInfo?.student_name}</div>

//         {/* Field: School ID */}
//         <div className="single_details">{head?.studentInfo?.school_code}</div>

//         {/* Field: Subjects and Years */}
//         {detailsLength === index ? (
//           <div className="subject_year_design">
//             {head.studentInfo?.subjectYear.map((data, idx) => (
//               <div key={idx} className="subject_year_design_inner">
//                 <div className="child_box_design">
//                   {data.subject.substring(0, 8)}
//                 </div>
//                 <div className="child_box_design">{data.year}</div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="subject_year_design">
//             <div className="subject_year_design_inner">
//               <div className="child_box_design">
//                 {head.studentInfo?.subjectYear[0].subject.substring(0, 8)}
//               </div>
//               <div className="child_box_design">
//                 {head.studentInfo?.subjectYear[0].year}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     ))}
//   </div>;