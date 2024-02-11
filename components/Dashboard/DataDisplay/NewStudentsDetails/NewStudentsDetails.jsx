import { useDispatch, useSelector } from 'react-redux';
import styles from './NewStudentsDetails.module.scss';
import { useEffect } from 'react';
import { studentDetails } from '@component/app/Reducers/studentReducer';
import Image from 'next/image';

const NewStudentsDetails = () => {
    const { isLoading, studentInfo} =
      useSelector((state) => state.student);
    const dispatch = useDispatch(); 
    const table_heading = [
      "Roll",
      "Name",
      "Father Name",
      "Mother Name",
      "Zone",
      "School Name",
      "Image",
    ];

    useEffect(() => {
        dispatch(studentDetails());
    },[]) 

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
              <div className="single_details">{head.father_name}</div>
              <div className="single_details">{head.mother_name}</div>
              <div className="single_details">{head.zone}</div>
              <div className="single_details">{head.school}</div>
              <div className="image_field">
              <Image
                  src={head.imageShow}
                  alt=""
                  fill="true"
                  className={styles.image_design}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default NewStudentsDetails;