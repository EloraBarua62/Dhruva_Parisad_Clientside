import { forgotPassword, messageClear } from "@component/app/Reducers/authReducer";
import styles from "./forgot_password.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Container from "@component/components/shared/Container/Container";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const handleFormSubmit = (event) => {
    const email = event.target.email.value;
    dispatch(forgotPassword({ email }));
    event.preventDefault();
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }     
  }, [successMessage, errorMessage, dispatch])
  return (
    <div className={styles.forgot_pass_section}>
      <Container>
        <div className={styles.forgot_pass_content}>
          <div className={styles.heading}>Reset Password</div>
          <div>
            Enter your email
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="email"></label>
              <input type="email" name="email" />
              <button>Submit</button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
