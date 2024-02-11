import Image from 'next/image';
import styles from './NewResult.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentDetails } from '@component/app/Reducers/studentReducer';

const NewResult = () => {
    const table_heading = ['Roll','Name','School ID','Subject','Year','Details'];
    const { isLoading, studentInfo } = useSelector((state) => state.student);
    const [detailsLength , setDetailsLength] = useState(-1);
    const [toogle, setToogle] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(studentDetails());
    }, []); 
    

    const handleToogle = (index) => {
      setToogle(!toogle);
      if(toogle)
        setDetailsLength(index);  
      else
        setDetailsLength(-1);

      // e.preventDefault();
    }
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
          {studentInfo.map((head, index) => (
            <div
              key={index}
              className={`${
                index % 2 == 0 ? "even_field_design" : "odd_field_design"
              }`}
            >
              <div className="text_details">{head._id}</div>
              <div className="single_details">{head.student_name}</div>
              <div className="single_details">{head.school}</div>
              {detailsLength === index ? (
                <div className="subject_year_design">
                  {head.subjectYear.map((data, idx) => (
                    <div key={idx} className="subject_year_design_inner">
                      <div className="child_box_design">{data.subject}</div>
                      <div className="child_box_design">{data.year}</div>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="subject_year_design">
                <div className="subject_year_design_inner">
                  <div className="child_box_design">{head.subjectYear[0].subject}</div>
                  <div className="child_box_design">{head.subjectYear[0].year}</div>
                </div>
                </div>
              )}

              <button
                className="single_details"
                onClick={() => handleToogle(index)}
              >
                {detailsLength === index? 'Close' : 'Open'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
};

export default NewResult;