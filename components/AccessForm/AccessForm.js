import Link from "next/link";
import styles from "./AccessForm.module.scss";
import { useState } from "react";

const AccessForm = ({ feature, route, fields }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value || "";
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log({ name, email, password });
  };

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
