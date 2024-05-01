import Image from 'next/image';
import styles from './Certificate.module.scss';
import certificate from '../../public/Dhruva Parisad.png'

const Certificate = ({student_name, roll, result}) => {
    return (
      <div className={styles.certificate_section}>
        This is your certificate.
        <div className={styles.child_section}>
          <Image src={certificate} alt="" className={styles.image_section} />
          {/* <div className={styles.image_section}></div> */}
          <h1>{student_name}</h1>
          <h1>{roll}</h1>
          <h1>{result}</h1>
        </div>
      </div>
    );
};

export default Certificate;