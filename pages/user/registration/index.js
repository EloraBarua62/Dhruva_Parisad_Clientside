import Container from '@component/components/shared/Container/Container';
import styles from './registration.module.scss';
import RegistrationForm from '@component/components/RegistrationForm/RegistrationForm';

const Registration = () => {
    return (
        <div className={styles.registration_design}>
            <Container>
                <RegistrationForm/>
            </Container>
        </div>
    );
};

export default Registration;