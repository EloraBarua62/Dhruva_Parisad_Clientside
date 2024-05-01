import Image from 'next/image';
import styles from './Certificate.module.scss';
import certificate from '../../public/Dhruva Parisad.png'
import { toPng } from "html-to-image";
import { useCallback, useRef } from 'react';


const Certificate = ({student_name, roll, result}) => {
  const ref = useRef(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
    return (
      <div className={styles.certificate_section}>
        <div className={styles.title}>Examination Certificate</div>
        <div className={styles.child_section} ref={ref}>
          <Image src={certificate} alt="" className={styles.image_section} />

          <div className={styles.student_info}>
            <div className={styles.name_design}>{student_name}</div>
            <div className={styles.roll_design}>{roll}</div>
            <div className={styles.result_design}>{result}</div>
          </div>
        </div>

        <button onClick={onButtonClick} className={styles.download_button}>
          Download Certificate
        </button>
      </div>
    );
};

export default Certificate;