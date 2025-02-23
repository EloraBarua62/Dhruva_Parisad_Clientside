import Link from "next/link";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logOut } from "@component/app/Reducers/authReducer";
import Image from "next/image";
import logo from "../../../public/logo.jpeg";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const pathname = usePathname();
  const [openHamburger, setOpenHamburger] = useState(false);
  let { role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const page_navigation = [
    { name: "/user", title: "Home", user_role: ["all"] },
    { name: "/user/news", title: "News", user_role: ["all"] },
    {
      name: "/user/exam_registration",
      title: "Exam Registration",
      user_role: ["all"],
    },
    {
      name: "/user/school_registration",
      title: "School Registration",
      user_role: ["principal", "admin"],
    },
    {
      name: "/user/result",
      title: "School Result",
      user_role: ["principal", "admin"],
    },
    {
      name: "/user/student_result",
      title: "Student Result",
      user_role: ["all"],
    },
    // { name: "/user/login", title: "Login", user_role: ["all"] },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    setOpenHamburger(!openHamburger)
    router.push("/user/login");
  };

  useEffect(() => {
    if (typeof document === "undefined") {
      router.push("/user/login");
    } else {
      let token_string = document.cookie;
      if (token_string?.length > 0) {
        const decodeToken = jwtDecode(token_string);
        role = decodeToken.role;
      }
    }
  }, [router, role]);
  return (
    <div className={styles.header_display}>
      {/* Name and logo display */}
      <Container>
        <div className={styles.header_inner}>
          <div className={styles.logo_section}>
            <div className={styles.logo_div}>
              <Image
                src={logo}
                alt=""
                fill
                sizes="(min-width: 66em) 33vw,
  (min-width: 44em) 50vw,
  100vw"
                priority={true}
                className={styles.logo_design}
              ></Image>
            </div>
            <Link className={styles.logo_name_design} href="/user">
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
              <button className={styles.logout_button} onClick={handleLogout}>
                Log Out
              </button>
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
                      onClick={() => setOpenHamburger(!openHamburger)}
                    >
                      {page.title}
                    </Link>
                  );
                }
              })
            )}
            {role != "" ? (
              <button className={styles.inactive_small} onClick={handleLogout} >
                Log Out
              </button>
            ) : (
              <Link
                className={`link ${
                  pathname === "/user/login"
                    ? styles.active_small
                    : styles.inactive_small
                }`}
                href={"/user/login"}
                onClick={() => setOpenHamburger(!openHamburger)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
