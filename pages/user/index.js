import { displayNews } from "@component/app/Reducers/newsReducer";
import { enlistedZone } from "@component/app/Reducers/schoolReducer";
import Banner from "@component/components/Banner/Banner";
import News from "@component/components/News/News";
import Container from "@component/components/shared/Container/Container";
import Link from "next/link";
import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";

const User = () => {
  const dispatch = useDispatch();
  const { newsList, isLoading } = useSelector((state) => state.news);
  const { zone } = useSelector((state) => state.school);

  const schools = [
    "A school",
    "B school",
    "C school",
    "DF school",
    "S school",
    "FS school",
    "ET school",
    "HH school",
    "QW school",
  ];
  useEffect(() => {
    const count = 4;
    dispatch(displayNews({ count }));
  }, []);


  return (
    <div className="user_page">
      {/* Banner section with responsive */}
      <Banner />

      {/* News display */}
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
        <News newsList={newsList} />
      )}

      {/* School Display section with responsive */}
      <div className="school_display">
        <Container>
          <div className="school_contents">
            <h1 className="school_title">Our Participating School</h1>
            <Marquee speed="30" onMount>
              {schools.map((school, index) => (
                <div className="marquee_display" key={index}>
                  {school}
                </div>
              ))}
            </Marquee>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default User;
