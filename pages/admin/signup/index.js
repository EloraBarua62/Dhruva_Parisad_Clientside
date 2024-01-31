import Container from '@component/components/shared/Container/Container';
import styles from './signup.module.scss';
import AccessForm from '@component/components/AccessForm/AccessForm';

const Signup = () => {
    const fields = [['name','Name'], ['email','Email'], ['password','Password']]
    return (
        <div className={styles.signup_page_setup}>
           <Container>
            <AccessForm fields={fields}/>
           </Container>
        </div>
    );
};

export default Signup;