import Image from 'next/image';
import styles from './Banner.module.scss';
import { banner_image } from '@component/utils/demoData';
import barath from '../../public/barath.jpg'


const Banner = () => {
    return (
      <div className={styles.banner_display}>
        <div className={styles.column1}>
            
        </div>
        <div className={styles.column2}>
            
        </div>
        <div className={styles.column3}>
            
        </div>
        <div className={styles.column4}>
            
        </div>
      </div>
    );
};

export default Banner;