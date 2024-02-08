import Link from "next/link";
import styles from "./AccessForm.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, userLogin, userSignup } from "@component/app/Reducers/authReducer";
import {toast} from "react-hot-toast";
import { useRouter } from "next/router";


const AccessForm = ({ feature, route, fields }) => {
  const {isLoading, role, userInfo, successMessage, errorMessage} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();


  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value || "";
    const email = event.target.email.value;
    const password = event.target.password.value;
    
    name === "" ? dispatch(userLogin({email,password})) : dispatch(userSignup({name, email, password }));
    
  };

  useEffect(()=>{
    if(successMessage){
        toast.success(successMessage);
        dispatch(messageClear());
        router.push(`/${role}`);
      }
    if (errorMessage){
        toast.error(errorMessage);
        dispatch(messageClear());
    }     
  },[successMessage,errorMessage,dispatch,userInfo])

  return (
    <div className={styles.access_form_design}>
      {/* Section: form design */}
      <div className={styles.form_design}>
        <form onSubmit={handleFormSubmit}>
          <h1 className={styles.heading_design}>{feature}</h1>

          {/* Section: input field design */}
          {fields.map((field, index) => (
            <div key={index} className={styles.field_design}>
              <input name={field[0]} type="text" required />
              <label htmlFor={field[0]}>{field[1]}</label>
            </div>
          ))}

          <button>Submit</button>
        </form>

        {/* Routing */}
        <div className={styles.routing_design}>
          <Link href={`/admin/${route}`} className={styles.routing}>
            New member?
          </Link>
          <Link href={`/`} className={styles.routing}>
            Forget password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessForm;
