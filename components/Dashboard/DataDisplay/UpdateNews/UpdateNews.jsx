import Image from "next/image";
import styles from "./UpdateNews.module.scss";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminDisplayNews,
  deleteInfo,
  newsPublish,
  updateInfo,
} from "@component/app/Reducers/newsReducer";
import { ThreeDots } from "react-loader-spinner";
import Pagination from "../../Pagination/Pagination";
import { IoMdCloseCircleOutline } from "react-icons/io";

const UpdateNews = () => {
  const { adminNewsList, totalData, isLoading } = useSelector(
    (state) => state.news
  );
  const [updateNewsInfo, setUpdateNewsInfo] = useState({});
  const [imageDisplay, setImageDisplay] = useState("");
  const [imageShow, setImageShow] = useState("");

  // Pagination
  const [parPage, setParPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    news_title: "",
    news_details: "",
    imp_date: "",
    imp_msg: "",
  });

  // Button to update news details
  const handleNewsUpdate = (news) => {
    setState({
      news_title: news.news_title,
      news_details: news.news_details,
      imp_date: news.imp_date,
      imp_msg: news.imp_msg,
    });
    setUpdateNewsInfo(news);
  };

  // Function to update student information
  const handleUpdateInfo = (info) => (e) => {
    e.preventDefault();
    const news_title = state.news_title;
    const news_details = state.news_details;
    const imp_date = state.imp_date;
    const imp_msg = state.imp_msg;

    const data = {
      ...info,
      news_title,
      news_details,
      imp_date,
      imp_msg,
    };
    dispatch(updateInfo(data));
    setState({
      news_title: "",
      news_details: "",
      imp_date: "",
      imp_date: "",
    });
  };

  // Function to delete news details
  const deleteNewsDetails = (id) => {
    const shouldRemove = confirm(
      `Are you sure you want to delete the news permanently?`
    );
    if (shouldRemove) {
      const data = { id };
      dispatch(deleteInfo(data));
    }
  };

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
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
    };
    dispatch(adminDisplayNews(obj));
  }, [currentPage, dispatch, parPage]);

  return (
    <div className={styles.update_news_design}>
      <div className={styles.all_news_contents}>
        {/* Display previous news */}
        <div className={styles.left_section_heading}>Previous News</div>
        {/* Pagination */}
        <div className={styles.pagination}>
          <div>Page no</div>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={totalData}
            parPage={parPage}
            showItem={4}
          />
        </div>

        {adminNewsList.map((single_news, index) => (
          <div key={index} className={styles.news_content}>
            <div className={styles.title}>{single_news.news_title}</div>
            <div className={styles.time}>
              Date: {single_news.updatedAt.substring(8, 10)}
              {"."}
              {single_news.updatedAt.substring(5, 7)}
              {"."}
              {single_news.updatedAt.substring(0, 4)}
            </div>
            <div className={styles.description}>
              <div className={styles.inner_description}>
                {single_news.news_details}
              </div>
            </div>
            <div className={styles.activity_section}>
              <button
                className={styles.update_button}
                onClick={() => handleNewsUpdate(single_news)}
              >
                Update
              </button>
              <button
                className={styles.delete_button}
                onClick={() => deleteNewsDetails(single_news._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {updateNewsInfo &&
        Object.keys(updateNewsInfo).length !== 0 &&
        updateNewsInfo.constructor === Object ? (
          <div className={styles.news_details_update}>
            <div className={styles.heading_design}>
              <div className={styles.news_head}>News Details</div>
              <button onClick={() => setUpdateNewsInfo({})}>
                <IoMdCloseCircleOutline className={styles.button_design} />
              </button>
            </div>
            {/* <div className={styles.school_name}>
              News Title: {updateNewsInfo.news_title}
            </div> */}
            <form onSubmit={handleUpdateInfo(updateNewsInfo)}>
              <label htmlFor="news_title">News Title</label>
              <input
                type="text"
                className={styles.input_field_design}
                name="news_title"
                defaultValue={updateNewsInfo.news_title}
                onChange={(e) =>
                  setState({
                    ...state,
                    news_title: e.target.value,
                  })
                }
              />
              <label htmlFor="news_details">Description</label>
              <textarea
                type="text"
                className={styles.input_field_design}
                name="news_details"
                defaultValue={updateNewsInfo.news_details}
                onChange={(e) =>
                  setState({
                    ...state,
                    news_details: e.target.value,
                  })
                }
              />
              <label htmlFor="imp_date">Important Date</label>
              <input
                type="text"
                className={styles.input_field_design}
                name="imp_date"
                defaultValue={updateNewsInfo.imp_date}
                onChange={(e) =>
                  setState({
                    ...state,
                    imp_date: e.target.value,
                  })
                }
              />
              <label htmlFor="imp_msg">Important Message</label>
              <input
                type="text"
                className={styles.input_field_design}
                name="imp_msg"
                defaultValue={updateNewsInfo.imp_msg}
                onChange={(e) =>
                  setState({
                    ...state,
                    imp_msg: e.target.value,
                  })
                }
              />
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
                  "Update"
                )}
              </button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Publish new news */}
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
                  fill="true"
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
