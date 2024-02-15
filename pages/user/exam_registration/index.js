import Container from '@component/components/shared/Container/Container';
import styles from './exam_registration.module.scss';
import ExamRegistrationForm from '@component/components/ExamRegistrationForm/ExamRegistrationForm';

const ExamRegistration = () => {
    return (
        <div className={styles.registration_design}>
            <Container>
               <ExamRegistrationForm/>
            </Container>
        </div>
    );
};

export default ExamRegistration;