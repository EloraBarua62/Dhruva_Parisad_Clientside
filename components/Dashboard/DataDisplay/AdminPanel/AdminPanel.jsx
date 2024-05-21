import { useDispatch, useSelector } from "react-redux";
import styles from "./AdminPanel.module.scss";
import { useEffect, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import { principalInformation } from "@component/app/Reducers/authReducer";
import { ThreeDots } from "react-loader-spinner";

const AdminPanel = () => {
  const { isLoading, principalInfo, totalData } = useSelector(
    (state) => state.auth
  );
  const [parPage, setParPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  // useEffect(()=>{
  //   if (typeof window !== "undefined") {
  //     const listInfo = JSON.parse(window.localStorage.getItem("principalInfo"));
  //     setPrincipalInfo(listInfo);
  //   }
  // },[])

  const table_heading = ["Name", "Email", "Password"];

  // useEffect(() => {
  //   const obj = {
  //     parPage: parseInt(parPage),
  //     page: parseInt(currentPage),
  //   };
  //   dispatch(principalInformation(obj));
  // }, [currentPage, parPage, dispatch]);

  // console.log(principalInfo)

  return (
    <div className={styles.admin_panel_design}>
      <h1>Principal Information</h1>
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
      ) : 
        <div>
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
          <div className={styles.heading_field_design}>
            {table_heading.map((head, index) => (
              <div key={index} className={styles.single_heading}>
                {head}
              </div>
            ))}
          </div>
          <div className={styles.info_field_design}>
            {principalInfo.map((head, index) => (
              <div
                key={index}
                className={`${
                  index % 2 == 0 ? "even_field_design" : "odd_field_design"
                }`}
              >
                <div className="text_details">{head.name}</div>
                <div className="single_details">{head.email}</div>
                <div className="single_details">{head.password}</div>
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default AdminPanel;
