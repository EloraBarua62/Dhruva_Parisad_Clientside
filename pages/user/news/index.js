import { displayNews } from '@component/app/Reducers/newsReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './newspage.module.scss'
import Container from '@component/components/shared/Container/Container';
import { FaShareAlt } from 'react-icons/fa';
import Image from 'next/image';

const NewsPage = () => {
    const { newsList } = useSelector((state) => state.news);
    const dispatch = useDispatch();
      
    useEffect(()=>{
        dispatch(displayNews());
    },[])
    return (
      <div className={styles.newspage_display}>
        <Container>
          <div className={styles.newspage_contents}>
            {newsList.map((news, index) => (
              <div key={index} className={styles.news_content}>
                {/* left section: image display*/}
                <div className={styles.image_section}>
                  <Image
                    src={newsList[0]?.imageShow}
                    alt=""
                    fill
                    className={styles.image_design}
                  ></Image>
                </div>

                {/* Left section: Details */}
                <div className={styles.info_section}>
                  <div className={styles.status_section}>
                    <div className={styles.status_right}>
                      <p className={styles.extra_details}>{news.createdAt}.</p>
                      <p className={styles.extra_details}>0 views</p>
                      <FaShareAlt
                        style={{ fontSize: "16px", color: "gray" }}
                        className={styles.icon_design}
                      />
                      {/* <div className={styles.share_design}>
                      <FaShareAlt className={styles.icon_design} />
                    </div> */}
                    </div>
                  </div>
                  <p className={styles.title}>{newsList[0]?.news_title}</p>
                  <div className={styles.imp_date_section}>
                    <div className={styles.imp_date}>Start: 12.12.2023</div>
                    <div className={styles.imp_date}>Start: 12.12.2024 </div>
                  </div>
                  <div className={styles.description_content}>
                    {newsList[0]?.news_details} Lorem ipsum dolor sit amet
                    consectetur, adipisicing elit. Recusandae quo quia corporis
                    ipsum? Soluta illum ipsum deserunt. Assumenda dolorum iure
                    minus? Quaerat maxime praesentium quidem veniam possimus
                    necessitatibus? Sequi perferendis error blanditiis saepe
                    labore a minus porro tempora explicabo harum dignissimos
                    voluptates ex quia omnis, obcaecati sint asperiores dicta
                    temporibus alias! Minus odio tempora fugiat maiores nam
                    obcaecati sint, aspernatur nobis officia id ullam labore,
                    omnis perferendis aut corrupti totam quis quasi
                    exercitationem facere, commodi vero ipsum. Fugiat saepe a,
                    numquam eos quam dicta unde nihil eveniet deserunt officiis
                    rem quos cupiditate cum, quisquam ipsum, dignissimos
                    temporibus soluta quibusdam iste!
                  </div>

                  <button className={styles.details_button}>Details</button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
};

export default NewsPage;