import Image from "next/image";
import styles from "./UpdateNews.module.scss";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayNews, newsPublish } from "@component/app/Reducers/newsReducer";

const UpdateNews = () => {
  const { newsList } = useSelector((state) => state.news);
  const [imageShow, setImageShow] = useState("");
  const dispatch = useDispatch();

  // Function: Add Image files
  const handleImage = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      // setState({ ...state, image: files[0] });
    }
  };

  const handleNewsSubmission = (event) => {
    const news_title = event.target.news_title.value;
    const news_details = event.target.news_details.value;
    console.log(news_title, news_details);
    dispatch(newsPublish({ news_title, news_details, imageShow }));
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(displayNews());
  }, []);

  return (
    <div>
      <div>
        {newsList.map((single_news, index) => (
          <div key={index}>
            <h1>{single_news.news_title}</h1>
            <p>{single_news.news_details}</p>
            <h1>{single_news.createdAt - Date.now()}</h1>
          </div>
        ))}
      </div>
      <div>
        <h1>Publish New News</h1>
        <form onSubmit={handleNewsSubmission}>
          <label htmlFor="news_title">Title</label>
          <input name="news_title" id="" />
          <label htmlFor="news_details">Describe</label>
          <textarea name="news_details" id="" cols="30" rows="10"></textarea>
          {/* Image */}
          <h1 className={styles.image_title}>Add Your Image</h1>
          <div className={styles.image_field_design}>
            <label htmlFor="image" className={styles.image_label}>
              {imageShow ? (
                <Image
                  src={imageShow}
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

          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default UpdateNews;
