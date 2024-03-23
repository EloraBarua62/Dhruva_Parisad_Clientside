import { useDispatch, useSelector } from 'react-redux';
import styles from './AdminPanel.module.scss';
import { messageClear, userSignup } from '@component/app/Reducers/authReducer';
import { ThreeDots } from 'react-loader-spinner';
import { useEffect } from 'react';

const AdminPanel = () => {

    const { isLoading, successMessage, errorMessage } = useSelector(
      (state) => state.auth
    );
    const fields = [
      ["name", "Name"],
      ["email", "Email"],
    ];
    const dispatch = useDispatch();

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      const role = "principal";

      dispatch(userSignup({name, email, role}));
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
    }, [successMessage, errorMessage, dispatch]);
    return (
      <div className={styles.admin_panel_design}>
        <div className={styles.all_user}></div>
        <div className={styles.principal_account_create}>
          <h1 className={styles.title}>New Principal Account</h1>
          <form onSubmit={handleFormSubmit}>
            {fields.map((field, index) => (
              <div key={index} className={styles.field_design}>
                <input name={field[0]} type="text" required />
                <label htmlFor={field[0]}>{field[1]}</label>
              </div>
            ))}

            <button
              className={styles.submit_button}
              type="submit"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    );
};

export default AdminPanel;