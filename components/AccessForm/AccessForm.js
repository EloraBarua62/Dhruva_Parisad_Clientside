import Link from "next/link";
import styles from "./AccessForm.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, userLogin, userSignup } from "@component/app/Reducers/authReducer";
import {toast} from "react-hot-toast";
import { useRouter } from "next/router";


const AccessForm = ({ feature, route, request, fields }) => {
  const {isLoading, role, userInfo, successMessage, errorMessage} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value || "" ;
    const email = event.target.email.value;
    const password = event.target.password?.value || 0 ;
    const role = request;
    
    name === "" ? dispatch(userLogin({email,password})) : dispatch(userSignup({name, email, role, password }));  
  };

  useEffect(()=>{
    if(successMessage){
        toast.success(successMessage);
        if (role === "admin" && router.pathname === "/admin/login" ) 
          router.push(`/${role}`);
        else{
          router.push("/user");
        }
        dispatch(messageClear());       
      }
    if (errorMessage){
        toast.error(errorMessage);
        dispatch(messageClear());
    }     
  },[successMessage,errorMessage,dispatch,userInfo, role, router])

  return (
    <div className={styles.access_form_design}>
      {/* Section: form design */}
      <div className={styles.form_design}>
        {router.pathname === "/admin/login" ? (
          <div className={styles.sub_head}>Admin Dashboard</div>
        ) : (
          ""
        )}
        <form onSubmit={handleFormSubmit}>
          <h1 className={styles.heading_design}>{feature}</h1>
          {request === "principal" && (
            <p style={{ color: "#e9efc0" }}>
              N.B: This form is only for school principal
            </p>
          )}

          {/* Section: input field design */}
          {fields.map((field, index) => (
            <div key={index} className={styles.field_design}>
              <input name={field[0]} type={field[0]} required />
              <label htmlFor={field[0]}>{field[1]}</label>
            </div>
          ))}

          <button>Submit</button>
        </form>

        {/* Routing */}
        <div className={styles.routing_design}>
          {request === "principal" ? (
            <Link href={`/user/${route}`} className={styles.routing}>
              {route === "signup" ? "New member?" : "Already have an account?"}
            </Link>
          ) : (
            ""
          )}
          <Link href={"/forgot_password"} className={styles.routing}>
            Forget password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessForm;
