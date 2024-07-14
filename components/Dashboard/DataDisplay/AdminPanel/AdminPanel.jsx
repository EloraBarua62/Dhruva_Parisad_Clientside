import { useDispatch, useSelector } from "react-redux";
import styles from "./AdminPanel.module.scss";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import {  examResultDate, messageClear } from "@component/app/Reducers/newsReducer";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const { isLoading, successMessage, errorMessage } = useSelector(
    (state) => state.news
  );
   const dispatch = useDispatch();
  const handleExamResultDate = (e) => {
    const exam_date = e.target.exam_date.value;
    const result_date = e.target.result_date.value;
    const data = { exam_date, result_date };
    dispatch(examResultDate(data));
    e.preventDefault();
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div className={styles.admin_panel_design}>
      <h1>Update Exam and Result date</h1>

      <form onSubmit={handleExamResultDate}>
        <label htmlFor="exam_date">Next Exam Date</label>
        <input type="date" name="exam_date" required />
        <label htmlFor="result_date">Next Result Publication Date</label>
        <input type="date" name="result_date" required />
        <input type="submit" value="Submit" className={styles.submit_button} />
      </form>

      {isLoading && (
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
      )}
    </div>
  );
};

export default AdminPanel;
