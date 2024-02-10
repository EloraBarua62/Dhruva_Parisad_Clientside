import styles from './RegistrationForm.module.scss';
import regFormField from '../../utils/demoData'
import Image from 'next/image';
import {CiImageOn} from 'react-icons/ci'
import { useState } from 'react';

const RegistrationForm = () => {
    const currentYear = new Date().getFullYear();
    const zone_list = ['Dhaka', 'Chittagong', 'Jashor', 'Barishal'];
    const subject_list = ['poem', 'rack', 'nock', 'shak','dance'];
    const year_list = ['primary', 'first', 'second', 'third', 'forth'];
    const [imageShow, setImageShow] = useState("");
    const [subjectYear, setSubjectYear] = useState([
      { subject: "poem", year: "primary" }
    ]);
    const handleImage = (e) => {
      let files = e.target.files;
      if (files.length > 0) {
        setImageShow(URL.createObjectURL(files[0]));
        // setState({ ...state, image: files[0] });
        }
    };

    const handleSubjectYear = (e) => {
      setSubjectYear([...subjectYear, { subject: "poem", year: "primary" }]);
      console.log(subjectYear)
      e.preventDefault();
    }

    const handleChange = (e,index) => {
      const {name, value}= e.target;    
      const onChangeValue = [...subjectYear];
      onChangeValue[index][name] = value;
      setSubjectYear(onChangeValue);
      console.log(subjectYear);
      e.preventDefault();
    }

    const handleDelete = (e,index) => {
      const deleteValue = [...subjectYear];
      deleteValue.splice(index, 1);
      console.log(deleteValue)
      setSubjectYear(deleteValue);
      e.preventDefault();
    }

    return (
      <div className={styles.form_design}>
        {/* Heading */}
        <div className={styles.heading_design}>
          <h1 className={styles.institute_name}>Dhruva Parisad</h1>
          <h1 className={styles.reg_no}>Registration No: 0923</h1>
          <div className={styles.date_design}>
            <h1>1430 BS</h1>
            <h1>{currentYear} AD</h1>
          </div>

          <h1 className={styles.exam_title}>
            Examination Registration Form - {currentYear}
          </h1>
        </div>

        <form>
          <div className={styles.user_info_section}>
            {regFormField.map((field, index) => (
              <div key={index} className={styles.field_design}>
                <label htmlFor={field.name}>{field.title}</label>
                <input type={field.type} name={field.name} id="" />
              </div>
            ))}
          </div>

          <div className={styles.exam_info_section}>
            <div className={styles.field_design}>
              <label htmlFor="zone">Select Your Examination Zone</label>
              <select name="zone" id="">
                {zone_list.map((zone, index) => (
                  <option key={index} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field_design}>
              <label htmlFor="zone">Select Your Examination Zone</label>
              <select name="zone" id="">
                {zone_list.map((zone, index) => (
                  <option key={index} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h1 className={styles.image_title}>Add Your Image</h1>
              {subjectYear.map((data, index) => (
                <div key={index}>
                  <select
                    name="subject"
                    id=""
                    value={data.subject}
                    onChange={(e) => handleChange(e, index)}
                  >
                    {subject_list.map((subject, i) => (
                      <option key={i} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <select
                    name="year"
                    id=""
                    value={data.year}
                    onChange={(e) => handleChange(e, index)}
                  >
                    {year_list.map((year, idx) => (
                      <option key={idx} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <button onClick={(e) => handleDelete(e, index)}>
                    Delete
                  </button>
                </div>
              ))}
              <button onClick={handleSubjectYear}>Add More</button>
            </div>

            {/* Image */}
            <h1 className={styles.image_title}>Add Your Image</h1>
            <div className={styles.image_field_design}>
              <label htmlFor="image" className={styles.image_label}>
                {imageShow ? (
                  <Image
                    src={imageShow}
                    alt=""
                    fill={true}
                    className={styles.image_display}
                  />
                ) : (
                  <>
                    <span className={styles.icon_size}>
                      <CiImageOn />
                    </span>
                    <span>Select Image</span>
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className={styles.image_file}
                placeholder="Image"
                onChange={handleImage}
              />
            </div>
          </div>
        </form>
      </div>
    );
};

export default RegistrationForm;