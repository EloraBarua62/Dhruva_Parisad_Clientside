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
    },[])
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
                      Date: {news.updatedAt.substring(8, 10)}
                      {"."}
                      {news.updatedAt.substring(5, 7)}
                      {"."}
                      {news.updatedAt.substring(0, 4)}
                    </p>
                    <p className={styles.details}>
                      {news.news_details} Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Nobis ullam architecto aperiam explicabo
                      maxime sunt ut quod? Sed doloremque tempora, accusantium
                      hic dolorem voluptatum maxime cupiditate totam dolore
                      soluta? Ducimus debitis exercitationem quibusdam beatae
                      fugit, nulla corporis dolore ex laborum dolores rem
                      explicabo, mollitia doloremque. Ad facilis minima nihil
                      quam voluptas repellendus omnis dolor ea doloremque esse?
                      Cupiditate sit harum itaque. Eveniet enim explicabo at
                      quis natus sequi fuga dolore id quibusdam omnis,
                      laudantium numquam aperiam cum nemo inventore rerum
                      delectus harum consectetur, perferendis libero eius!
                      Fugit, consequuntur rerum? Ullam optio perspiciatis
                      accusantium consequuntur iste dolor quibusdam, neque
                      impedit blanditiis tenetur voluptatem quidem laudantium
                      labore doloremque eligendi ratione quod, inventore
                      delectus in, odio facere dolorum! Suscipit id laborum
                      adipisci molestias fugit facere tempora aliquid sint
                      totam, sunt hic dolores velit ducimus nobis magni aperiam
                      dolorum est minima rem, perferendis in nulla veniam? Dolor
                      dicta quam ut labore rerum laudantium sint debitis illum
                      architecto blanditiis dolorem nesciunt voluptatibus harum
                      veniam temporibus, qui itaque tempora sed tempore nostrum
                      perferendis? Nihil dicta laboriosam necessitatibus, quia
                      quasi, ea quos error, minus ducimus accusantium deleniti
                      dolore eius aut incidunt impedit? In, non nesciunt ratione
                      neque impedit rem repellat assumenda praesentium
                      asperiores sunt id odit fuga.
                    </p>
                    <Link
                      href={`/user/news/${newsList[index]?._id}`}
                      className={styles.details_button}
                    >
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
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
};

export default NewsPage;