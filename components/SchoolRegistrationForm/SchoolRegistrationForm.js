import { schoolFormField } from '@component/utils/demoData';
import styles from './SchoolRegistrationForm.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { enlistedZone, schoolRegistration } from '@component/app/Reducers/schoolReducer';
import { useEffect } from 'react';

const SchoolRegistrationForm = () => {
  // Import state variable
  const { zoneInfo } = useSelector((state) => state.school);

  // Import by-default functions
  const dispatch = useDispatch();


  // Set Initial values for UI
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDay();
  let currentBanglaYear = currentYear - 594;
  if (month >= 3 && day >= 15) ++currentBanglaYear;


  
  const handleRegistrationForm = (e) => {
    e.preventDefault();
    const school_name = e.target.school_name.value;
    const zone = e.target.zone.value;
    const location = e.target.location.value;
    const registration_no = e.target.registration_no.value;
    const principal = e.target.principal.value;
    const email = e.target.email.value;
    const phone_no = e.target.phone_no.value;

    const state = {
      school_name,
      zone,
      location,
      registration_no,
      principal,
      email,
      phone_no,
    };
    dispatch(schoolRegistration(state));
    console.log(state);
  };

  
  return (
    <div className={styles.form_design}>
      {/* Heading */}
      <div className={styles.heading_design}>
        <h1 className={styles.institute_name}>Dhruva Parisad</h1>
        <h1 className={styles.reg_no}>Registration No: 0923</h1>
        <div className={styles.date_design}>
          <h1>{currentBanglaYear} BS</h1>
          <h1>{currentYear} AD</h1>
        </div>

        <h1 className={styles.exam_title}>
          School Registration Form - {currentYear}
        </h1>
      </div>

      <form onSubmit={handleRegistrationForm}>
        <div className={styles.school_info_section}>
          <div className={styles.field_design}>
            <label htmlFor="zone">Select School Zone</label>
            <select name="zone" id="">
              {zoneInfo.map((zone, index) => (
                <option key={index} value={zone.name}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>

          {schoolFormField.map((field, index) => (
            <div key={index} className={styles.field_design}>
              <label htmlFor={field.name}>{field.title}</label>
              <input type={field.type} name={field.name} id="" />
            </div>
          ))}

          <div className={styles.field_design}>
            <label htmlFor="location">Location</label>
            <textarea type="text" name="location" id="" />
          </div>

          <div className={styles.button_design}>
            <button>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SchoolRegistrationForm;