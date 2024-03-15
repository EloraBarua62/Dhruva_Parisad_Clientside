import Link from "next/link";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../Container/Container";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const Header = () => {
  const pathname = usePathname();
  const [openHamburger, setOpenHamburger] = useState(false);
  const {role} = useSelector((state) => state.auth);
  const page_navigation = [
    { name: "/user/news", title: "News", user_role: ["all"] },
    {
      name: "/user/exam_registration",
      title: "Exam Registration",
      user_role: ["student", "admin"],
    },
    {
      name: "/user/school_registration",
      title: "School Registration",
      user_role: ["principal", "admin"],
    },
    {
      name: "/user/result",
      title: "Result",
      user_role: ["student", "principal", "admin"],
    },
    { name: "/user/login", title: "Login", user_role: ["all"] },
  ];
  return (
    <div className={styles.header_display}>
      {/* Name and logo display */}
      <Container>
        <div className={styles.header_inner}>
          <div>
            <Link className={styles.logo_design} href="/user">
              Dhruvo Parishad
            </Link>
          </div>

          <div className={styles.all_routes_large_device}>
            {page_navigation.map((page, index) =>
              page.user_role.map((privacy) => {
                if ((role != "" && privacy == role) || privacy == "all") {
                  return (
                    <Link
                      key={index}
                      className={`link ${
                        pathname === `${page.name}`
                          ? styles.active
                          : styles.inactive
                      }`}
                      href={`${page.name}`}
                    >
                      {page.title}
                    </Link>
                  );
                }
              })
            )}
          </div>
          <div className={styles.icon_display}>
            {openHamburger ? (
              <button
                onClick={() => setOpenHamburger(!openHamburger)}
                className={styles.icon_design}
              >
                <IoCloseSharp className={styles.icon_design} />
              </button>
            ) : (
              <button
                onClick={() => setOpenHamburger(!openHamburger)}
                className={styles.icon_design}
              >
                <GiHamburgerMenu className={styles.icon_design} />
              </button>
            )}
          </div>
        </div>
      </Container>

      {openHamburger && (
        <div className={styles.small_device_overlay}>
          <div className={styles.all_routes_small_device}>
            {page_navigation.map((page, index) =>
              page.user_role.map((privacy) => {
                if ((role != "" && privacy == role) || privacy == "all") {
                  return (
                    <Link
                      key={index}
                      className={`link ${
                        pathname === `${page.name}`
                          ? styles.active_small
                          : styles.inactive_small
                      }`}
                      href={`${page.name}`}
                    >
                      {page.title}
                    </Link>
                  );
                }
              })
            )} 
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
