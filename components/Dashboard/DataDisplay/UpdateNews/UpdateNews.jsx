import Image from "next/image";
import styles from "./UpdateNews.module.scss";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayNews, newsPublish } from "@component/app/Reducers/newsReducer";
import { ThreeDots } from "react-loader-spinner";

const UpdateNews = () => {
  const { newsList, isLoading } = useSelector((state) => state.news);
  const [imageDisplay, setImageDisplay] = useState("");
  const [imageShow, setImageShow] = useState("");
  const dispatch = useDispatch();

  // Function: Add Image files
  const handleImage = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageDisplay(URL.createObjectURL(files[0]));
      setImageShow(files[0]);
    }
  };

  const handleNewsSubmission = (event) => {
    const news_title = event.target.news_title.value;
    const news_details = event.target.news_details.value;
    const imp_date = event.target.imp_date.value;
    const imp_msg = event.target.imp_msg.value;

    const formData = new FormData();
    formData.append("news_title", news_title);
    formData.append("news_details", news_details);
    formData.append("imp_date", imp_date);
    formData.append("imp_msg", imp_msg);
    formData.append("imageShow", imageShow);
    dispatch(newsPublish(formData));
    event.preventDefault();
  };

  useEffect(() => {
    const count = 100;
    dispatch(displayNews({count}));
  }, []);

  return (
    <div className={styles.update_news_design}>
      <div className={styles.all_news_contents}>
        <div className={styles.left_section_heading}>Privious News</div>
        {newsList.map((single_news, index) => (
          <div key={index} className={styles.news_content}>
            <div className={styles.title}>{single_news.news_title}</div>
            <div className={styles.description}>{single_news.news_details}</div>
            <div className={styles.time}>
              Date: {single_news.updatedAt.substring(8, 10)}
              {"."}
              {single_news.updatedAt.substring(5, 7)}
              {"."}
              {single_news.updatedAt.substring(0, 4)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.update_news}>
        <div className={styles.new_news}>Publish New News</div>
        <form onSubmit={handleNewsSubmission}>
          <label className={styles.title_design} htmlFor="news_title">
            Title
          </label>
          <textarea name="news_title" cols="30" rows="2" type="text" />
          <label className={styles.title_design} htmlFor="news_details">
            Describe
          </label>
          <textarea name="news_details" id="" cols="30" rows="10"></textarea>
          <label className={styles.title_design} htmlFor="imp_date">
            Important Date
          </label>
          <textarea name="imp_date" cols="30" rows="2" type="text" />
          <label className={styles.title_design} htmlFor="imp_msg">
            Important Message
          </label>
          <textarea name="imp_msg" cols="30" rows="2" type="text" />
          {/* Image */}
          <div className={styles.image_title}>Add Your Image</div>
          <div className={styles.image_field_design}>
            <label htmlFor="image" className={styles.image_label}>
              {imageDisplay ? (
                <Image
                  src={imageDisplay}
                  alt=""
                  fill={true}
                  className={styles.image_display}
                />
              ) : (
                <>
                  <span className={styles.icon_size}>
                    <CiImageOn />
                  </span>
                  <span>Select Image</span>
                </>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className={styles.image_file}
              placeholder="Image"
              onChange={handleImage}
            />
          </div>

          {/* <input
            className={styles.submit_button}
            type="submit"
            value="Submit"
          /> */}
          <button
            className={styles.submit_button}
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNews;
