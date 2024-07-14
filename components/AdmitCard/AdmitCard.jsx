import Image from 'next/image';
import styles from './AdmitCard.module.scss';
import admitcard from '../../public/admit card DP.png'
import { toPng } from "html-to-image";
import { useCallback, useRef } from 'react';


const Admitcard = ({ studentDetail, exam_date }) => {
  const ref = useRef(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Admit Card.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
      });
  }, [ref]);
  return (
    <div className={styles.certificate_section}>
      <div className={styles.title}>Admit Card</div>
      <div className={styles.child_section} ref={ref}>
        <Image
          src={admitcard}
          alt=""
          fill="true"
          sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
          className={styles.image_section}
        />

        <div className={styles.student_info}>
          <div className={styles.student_image}>
            <Image
              src={studentDetail.imageShow}
              alt=""
              fill="true"
              sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
              className={styles.image_set}
            />
          </div>
          <div className={styles.date_design}>
            {exam_date?.substring(8, 10)}-{exam_date?.substring(5, 7)}-
            {exam_date?.substring(0, 4)}
          </div>
          <div className={styles.name_design}>{studentDetail.student_name}</div>
          <div className={styles.roll_design}>{studentDetail.roll}</div>
          <div className={styles.father_name_design}>
            {studentDetail.father_name}
          </div>
          <div className={styles.mother_name_design}>
            {studentDetail.mother_name}
          </div>
          <div className={styles.school_design}>{studentDetail.school}</div>
          <div className={styles.sub_year_section}>
            {studentDetail.subjectYear.map((each, i) => (
              <div className={styles.sub_year_field} key={i}>
                <div className={styles.subject_design}>{each.subject}</div>
                <div className={styles.year_design}>{each.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={onButtonClick} className={styles.download_button}>
        Download Admit Card
      </button>
    </div>
  );
};

export default Admitcard;