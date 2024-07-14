import Container from '@component/components/shared/Container/Container';
import styles from './signup.module.scss';
import AccessForm from '@component/components/AccessForm/AccessForm';

const Signup = () => {
    const feature = "SIGN UP";
    const route = "login";
    const request = "principal";
    const fields = [
      ["name", "Name"],
      ["email", "Email"],
    ];
    return (
      <div className={styles.signup_page_setup}>
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

export default Signup;