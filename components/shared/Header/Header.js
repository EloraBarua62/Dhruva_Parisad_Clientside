import Link from "next/link";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../Container/Container";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [openHamburger, setOpenHamburger] = useState(false);
  const {role} = useSelector((state) => state.auth);
  const router = useRouter();
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
    // { name: "/user/login", title: "Login", user_role: ["all"] },
  ];

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1971 00:00:00 UTC; path=/;";
      router.push('/login');
  }
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
            {role != "" ? (
              <button onClick={handleLogout}>Log Out</button>
            ) : (
              <Link
                className={`link ${
                  pathname === "/user/login" ? styles.active : styles.inactive
                }`}
                href={"/user/login"}
              >
                Login
              </Link>
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
