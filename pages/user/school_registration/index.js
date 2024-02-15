import Container from "@component/components/shared/Container/Container";
import styles from "./school_registration.module.scss";
import SchoolRegistrationForm from "@component/components/SchoolRegistrationForm/SchoolRegistrationForm";

const SchoolRegistration = () => {
  return (
    <div className={styles.registration_design}>
      <Container>
        <SchoolRegistrationForm />
      </Container>
    </div>
  );
};

export default SchoolRegistration;
