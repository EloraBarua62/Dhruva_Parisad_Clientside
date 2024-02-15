import { useEffect } from 'react';
import styles from './SchoolInformation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { enlistedSchools, enlistedZone } from '@component/app/Reducers/schoolReducer';

const SchoolInformation = () => {
    const { zoneInfo, schoolInfo } = useSelector((state) => state.school);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(enlistedZone());
    }, []);

const handleChange = (e) => {
  const zone_name = e.target.zone.value;
  dispatch(enlistedSchools(zone_name));
  
  // const onChangeValue = [...subjectYear];
  // onChangeValue[index][name] = value;
  // setSubjectYear(onChangeValue);
  // console.log(subjectYear);
  e.preventDefault();
};
    
    return (
      <div className={styles.schoolInfo_design}>
        {/*Enlisted School  */}
        <div>
          <div>
            <label htmlFor="zone">Select Zone</label>
            <select name="zone" onChange={(e) => handleChange(e)}>
              {zoneInfo.map((zone, index) => (
                <option key={index} value={zone.name}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.school_table}></div>
        </div>

        {/* School Registration */}
        <div className={styles.school_registration_table}>
          <form></form>
        </div>
      </div>
    );
};

export default SchoolInformation;