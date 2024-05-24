import AccessForm from '@component/components/AccessForm/AccessForm';
import Container from '@component/components/shared/Container/Container';
import styles from "./login.module.scss";
import Image from 'next/image';
import logo from "../../../public/logo.jpeg";

const login = () => {
    const feature = "LOGIN";
    const route = "";
    const request = "admin"
    const fields = [
      ["email", "Email"],
      ["password", "Password"],
    ];
    return (
      <div className={styles.login_page_setup}>
        <div className={styles.logo_section}>
          <div className={styles.logo_div}>
            <Image
              src={logo}
              alt=""
              fill
              sizes="100%"
              priority={true}
              className={styles.logo_design}
            ></Image>
          </div>
          <div className={styles.logo_name_design}>Dhruvo Parishad</div>
        </div>

        <Container>
          <AccessForm
            feature={feature}
            route={route}
            request={request}
            fields={fields}
          />
        </Container>
      </div>
    );
};

export default login;