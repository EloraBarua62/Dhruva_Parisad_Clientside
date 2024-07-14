import { displayNews } from '@component/app/Reducers/newsReducer';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './newspage.module.scss'
import Container from '@component/components/shared/Container/Container';
import { FaShareAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const NewsPage = () => {
    const { newsList } = useSelector((state) => state.news);
    const dispatch = useDispatch();
      
    useEffect(()=>{
        dispatch(displayNews());
    },[dispatch])
    return (
      <div className={styles.newspage_display}>
        <Container>
          <div className={styles.main_content}>
            <h1 className={styles.heading}>News</h1>
            <div className={styles.newspage_contents}>
              {newsList.map((news, index) => (
                <div key={index} className={styles.news_details_section}>
                  <div className={styles.info_section}>
                    <h1 className={styles.title}>{news.news_title}</h1>
                    <p className={styles.time}>
                      Date: {news?.updatedAt?.substring(8, 10)}
                      {"."}
                      {news?.updatedAt?.substring(5, 7)}
                      {"."}
                      {news?.updatedAt?.substring(0, 4)}
                    </p>
                    <p className={styles.details}>
                      {news.news_details} 
                    </p>
                    <Link
                      href={`/user/news/${newsList[index]?._id}`}
                      className={styles.details_button}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
};

export default NewsPage;