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
    }, []);
    console.log(router.query.id)
    console.log(newsList)
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
                        <p className={styles.details}>
                          {news.news_details} Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Doloribus ullam, labore
                          itaque officiis nesciunt obcaecati molestiae odio
                          earum ipsa debitis vel excepturi. Soluta sequi veniam
                          corrupti mollitia eaque repudiandae a. Eaque sed a
                          pariatur alias nam dicta, perspiciatis quas numquam
                          molestias, commodi, similique culpa illo optio et
                          veritatis aspernatur! Deserunt quasi porro laboriosam
                          illo. Quasi earum maiores perspiciatis neque error
                          nesciunt in dolorum enim! Similique, corporis quis.
                          Sapiente excepturi obcaecati facilis in aliquid culpa
                          cumque quia, non explicabo nemo. Ipsa quod ad sint
                          distinctio asperiores magni corrupti consequatur
                          cupiditate at nihil, veniam ullam ut reiciendis quas
                          molestias nulla, inventore cumque?
                        </p>
                      </div>
                      <div className={styles.image_section}>
                        <Image
                          src={news.imageShow}
                          alt=""
                          fill
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
                          {news.news_details} Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Doloribus ullam, labore
                          itaque officiis nesciunt obcaecati molestiae odio
                          earum ipsa debitis vel excepturi. Soluta sequi veniam
                          corrupti mollitia eaque repudiandae a. Eaque sed a
                          pariatur alias nam dicta, perspiciatis quas numquam
                          molestias, commodi, similique culpa illo optio et
                          veritatis aspernatur! Deserunt quasi porro laboriosam
                          illo. Quasi earum maiores perspiciatis neque error
                          nesciunt in dolorum enim! Similique, corporis quis.
                          Sapiente excepturi obcaecati facilis in aliquid culpa
                          cumque quia, non explicabo nemo. Ipsa quod ad sint
                          distinctio asperiores magni corrupti consequatur
                          cupiditate at nihil, veniam ullam ut reiciendis quas
                          molestias nulla, inventore cumque?
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
                          fill
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