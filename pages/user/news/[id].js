import { displayNews } from '@component/app/Reducers/newsReducer';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './[id].module.scss'
import Container from '@component/components/shared/Container/Container';
import Image from 'next/image';
import Link from 'next/link';

const NewsDetails = () => {
    const { newsList } = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const router = useRouter();
    const id = router.query.id;

    useEffect(() => {
      dispatch(displayNews());
    }, [dispatch]);

    return (
      <div className={styles.news_display}>
        <Container>
          <div className={styles.news_content}>
            <div className={styles.targeted_news_content}>
              {newsList.map((news, index) => {
                if (news._id === id) {
                  return (
                    <div key={index} className={styles.news_details_section}>
                      <div className={styles.info_section}>
                        <h1 className={styles.title}>{news.news_title}</h1>
                        <p className={styles.time}>
                          Date: {news.updatedAt.substring(8, 10)}
                          {"."}
                          {news.updatedAt.substring(5, 7)}
                          {"."}
                          {news.updatedAt.substring(0, 4)}
                        </p>
                        <p className={styles.details}>{news.news_details}</p>
                      </div>
                      <div className={styles.image_section}>
                        <Image
                          src={news.imageShow}
                          alt=""
                          fill="true"
                          sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
                          className={styles.image_design}
                        ></Image>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className={styles.other_news_content}>
              {newsList.map((news, index) => {
                if (news._id != id) {
                  return (
                    <div key={index} className={styles.news_details_section}>
                      <div className={styles.info_section}>
                        <h1 className={styles.title}>{news.news_title}</h1>
                        <p className={styles.time}>
                          Date: {news.updatedAt.substring(8, 10)}
                          {"."}
                          {news.updatedAt.substring(5, 7)}
                          {"."}
                          {news.updatedAt.substring(0, 4)}
                        </p>
                        <p className={styles.details}>
                          {news.news_details}
                        </p>
                        <Link
                          href={`${newsList[index]?._id}`}
                          className={styles.details_button}>
                          Details
                        </Link>
                      </div>
                      {/* <div className={styles.image_section}>
                        <Image
                          src={news.imageShow}
                          alt=""
                          fill="true"
                          className={styles.image_design}
                        ></Image>
                      </div> */}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </Container>
      </div>
    );
};

export default NewsDetails;