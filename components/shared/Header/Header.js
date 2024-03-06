import Link from "next/link";
import styles from "./Header.module.scss";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "../Container/Container";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const pathname = usePathname();
  const [openHamburger, setOpenHamburger] = useState(false);
  const page_navigation = [
    { name: "news", title: "News" },
    { name: "exam_registration", title: "Exam Registration" },
    { name: "school_registration", title: "School Registration" },
    { name: "result", title: "Result" },
    { name: "login", title: "Login" },
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
            {page_navigation.map((page, index) => (
              <Link
                key={index}
                className={`link ${
                  pathname === `/user/${page.name}`
                    ? styles.active
                    : styles.inactive
                }`}
                href={`/user/${page.name}`}
              >
                {page.title}
              </Link>
            ))}
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
            {page_navigation.map((page, index) => (
              <Link
                key={index}
                className={`link ${
                  pathname === `/user/${page.name}`
                    ? styles.active_small
                    : styles.inactive_small
                }`}
                href={`/user/${page.name}`}
              >
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
