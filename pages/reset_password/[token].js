import { messageClear, resetPassword } from '@component/app/Reducers/authReducer';
import styles from './reset_password.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@component/components/shared/Container/Container';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const ResetPassword = () => {
  const { role, successMessage, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();
    const token = router.query.token;
    
    const handleFormSubmit = (event) => {
      const password = event.target.password.value;
      dispatch(resetPassword({ password, token }));
      event.preventDefault();
    }

    useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        if (role === "admin"){
          router.push(`/${role}`);
        }          
        else {
          router.push("/user");
        }
        dispatch(messageClear());
      }
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      }
    }, [successMessage, errorMessage, dispatch, role, router]);
    return (
      <div className={styles.reset_pass_section}>
        <Container>
          <div className={styles.reset_pass_content}>
            <div className={styles.heading}>Reset Password</div>
            <div>
              Enter your password
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="password"></label>
                <input type="password" name="password" />
                <button>Submit</button>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
};

export default ResetPassword;