import Image from 'next/image';
import styles from './Banner.module.scss';
import { banner_image } from '@component/utils/demoData';
import barath from '../../public/barath.jpg'


const Banner = () => {
    return (
      <div className={styles.banner_display}>
        <div className={styles.column1}>
          <Image
            src={banner_image.barath_long}
            alt=""
            fill="true"
            className={styles.image_design1}
          ></Image>
        </div>
        <div className={styles.column2}>
          <div className={styles.colage_design}>
            <Image
              src={banner_image.sitar}
              alt=""
              fill="true"
              className={styles.image_design2}
            ></Image>
          </div>
          <div className={styles.colage_design}>
            <Image
              src={banner_image.paint}
              alt=""
              fill="true"
              className={styles.image_design2}
            ></Image>
          </div>
        </div>
        <div className={styles.column3}>
          <Image
            src={banner_image.kathak}
            alt=""
            fill="true"
            className={styles.image_design1}
          ></Image>
        </div>
        <div className={styles.column4}>
          <div className={styles.colage_design}>
            <Image
              src={banner_image.tabla}
              alt=""
              fill="true"
              className={styles.image_design2}
            ></Image>
          </div>
          <div className={styles.colage_design}>
            <Image
              src={banner_image.harmon}
              alt=""
              fill="true"
              className={styles.image_design2}
            ></Image>
          </div>
        </div>
        <div className={styles.column5}>
          <Image
            src={banner_image.barath_short}
            alt=""
            fill="true"
            className={styles.image_design1}
          ></Image>
        </div>
      </div>
    );
};

export default Banner;