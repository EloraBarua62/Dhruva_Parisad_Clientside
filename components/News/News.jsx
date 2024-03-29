import Image from "next/image";
import Container from "../shared/Container/Container";
import styles from "./News.module.scss";
import { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import Link from "next/link";

const News = ({ newsList }) => {
  console.log(newsList);
  const year = new Date().getFullYear();
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const time = [];
  
  
  newsList.map((news) => {
    let value;
    if (year - parseInt(news.updatedAt.substring(0, 4)) > 0) {
      value = year - parseInt(news.updatedAt.substring(0, 4));
      if (value == 1) time.push(value + " year ago");
      else time.push(value + " years ago");
    } else if (month - parseInt(news.updatedAt.substring(5, 7)) > 0) {
      value = month - parseInt(news.updatedAt.substring(5, 7));
      if (value == 1) time.push(value + " month ago");
      else time.push(value + " months ago");
    } else if (date - parseInt(news.updatedAt.substring(8, 10)) > 0) {
      value = date - parseInt(news.updatedAt.substring(8, 10));
      if (value == 1) time.push(value + " day ago");
      else time.push(value + " days ago");
    } else {
      time.push("Today");
    }
  });

  return (
    <div className={styles.news_display}>
      <h1 className={styles.heading}>News</h1>
      <Container>
        <div className={styles.news_contents}>
          <div className={styles.news_left_section}>
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
                <div className={styles.status_left}>Current</div>
                <div className={styles.status_right}>
                  <p className={styles.extra_details}>{time[0]}.</p>
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
                {newsList[0]?.news_details}
              </div>

              <Link
                href={`user/news/${newsList[0]?._id}`}
                className={styles.details_button}
              >
                Details
              </Link>
            </div>
          </div>

          <div className={styles.news_right_section}>
            {newsList.map((news, index) =>
              index > 0 ? (
                <div key={index} className={styles.previous_news_section}>
                  {/* Left side: Image */}
                  <div className={styles.image_section}>
                    <Image
                      src={news.imageShow}
                      alt=""
                      fill
                      className={styles.image_design}
                    ></Image>
                  </div>

                  {/* Right side: Details */}
                  <div className={styles.info_section}>
                    <div className={styles.status_left}>Previous</div>
                    <p className={styles.title}>{news?.news_title}</p>

                    <div className={styles.status_section}>
                      <div className={styles.status_right}>
                        <p className={styles.extra_details}>{time[index]}.</p>
                        <p className={styles.extra_details}>0 views</p>
                      </div>

                      <FaShareAlt
                        style={{ fontSize: "16px", color: "gray" }}
                        className={styles.icon_design}
                      />
                      {/* <div className={styles.share_design}>
                      <FaShareAlt className={styles.icon_design} />
                    </div> */}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </Container>
      <Link href="/user/news" className={styles.load_more_button}>
        Load More News
      </Link>
    </div>
  );
};

export default News;
