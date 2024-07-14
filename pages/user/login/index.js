import AccessForm from '@component/components/AccessForm/AccessForm';
import Container from '@component/components/shared/Container/Container';
import styles from "./login.module.scss";

const login = () => {
    const feature = "LOGIN";
    const route = "signup";
    const request = "principal";
    const fields = [
      ["email", "Email"],
      ["password", "Password"],
    ];
    return (
      <div className={styles.login_page_setup}>
        <Container>
          <AccessForm feature={feature} route={route} request={request} fields={fields} />
        </Container>
      </div>
    );
};

export default login;