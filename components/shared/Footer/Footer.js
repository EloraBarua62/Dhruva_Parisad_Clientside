import Link from "next/link";
import Container from "../Container/Container";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer_display}>
      <Container>
        <div className={styles.footer_contents}>
          {/* Title display */}
          <div className={styles.title_display}>
            <div className={styles.title}>Dhruvo Parishad</div>
            <div className={styles.info}>Since 1998</div>
          </div>

          <div className={styles.info_section}>
            <div className={styles.extra_contents}>
              <h1 className={styles.heading}>Our office</h1>
              <div className={styles.districts}>
                <h1 className={styles.district_name}>Dhaka</h1>
                <h1 className={styles.district_name}>Chittagong</h1>
              </div>
              <div className={styles.districts}>
                <h1 className={styles.district_name}>Jashore</h1>
                <h1 className={styles.district_name}>Barishal</h1>
              </div>
            </div>
            <div className={styles.extra_contents}>
              <h1 className={styles.heading}>Follow Us</h1>
              <Link href="/user" className={styles.contact}>
                Facebook
              </Link>
              <Link href="/user" className={styles.contact}>
                LinkedIn
              </Link>
            </div>
          </div>

          <div className={styles.subscribe_display}>
            <div className={styles.contents}>
              <h1 className={styles.heading}>Subscribe</h1>
              <form>
                <input type="text" name="" id="" className={styles.email} />
                <input type="submit" value="Submit" className={styles.submit} />
              </form>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
