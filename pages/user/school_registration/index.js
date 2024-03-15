import Container from "@component/components/shared/Container/Container";
import styles from "./school_registration.module.scss";
import SchoolRegistrationForm from "@component/components/SchoolRegistrationForm/SchoolRegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { enlistedZone } from "@component/app/Reducers/schoolReducer";
import { useEffect } from "react";

const SchoolRegistration = () => {
const {role} = useSelector((state) => state.auth);
const dispatch = useDispatch();

  useEffect(() => {
    if (role !== "") dispatch(enlistedZone());
  }, [role, dispatch]);
  return (
    <div className={styles.registration_design}>
      <Container>
        <SchoolRegistrationForm />
      </Container>
    </div>
  );
};

export default SchoolRegistration;
