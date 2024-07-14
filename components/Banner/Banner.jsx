import Image from 'next/image';
import styles from './Banner.module.scss';
import barath_long from "../../public/barath.jpg";
import barath_short from "../../public/barath2.jpg";
import kathak from "../../public/kathak.webp";
import sitar from "../../public/sitar.jpg";
import harmon from "../../public/harmon.jpg";
import tabla from "../../public/tabla.jpg";
import paint from "../../public/paint.jpg";
// import { banner_image } from '@component/utils/demoData';


const Banner = () => {
    return (
      <div className={styles.banner_display}>
        <div className={styles.column1}>
          <Image
            src={barath_long}
            alt=""
            fill
            sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
            priority={true}            
            className={styles.image_design1}
          ></Image>
        </div>
        <div className={styles.column2}>
          <div className={styles.colage_design}>
            <Image
              src={sitar}
              alt=""
              fill

              sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
              priority={true}
              className={styles.image_design2}
            ></Image>
          </div>
          <div className={styles.colage_design}>
            <Image
              src={paint}
              alt=""
              fill

              sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
              priority={true}
              className={styles.image_design2}
            ></Image>
          </div>
        </div>
        <div className={styles.column3}>
          <Image
            src={kathak}
            alt=""
            fill
            sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
            priority={true}            
            className={styles.image_design1}
          ></Image>
        </div>
        <div className={styles.column4}>
          <div className={styles.colage_design}>
            <Image
              src={tabla}
              alt=""
              fill

              sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
              priority={true}
              className={styles.image_design2}
            ></Image>
          </div>
          <div className={styles.colage_design}>
            <Image
              src={harmon}
              alt=""
              fill
              sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
              priority={true}
              className={styles.image_design2}
            ></Image>
          </div>
        </div>
        <div className={styles.column5}>
          <Image
            src={barath_short}
            alt=""
            fill
            sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
            priority={true}
            className={styles.image_design1}
          ></Image>
        </div>
      </div>
    );
};

export default Banner;