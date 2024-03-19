import Container from '@component/components/shared/Container/Container';
import styles from './exam_registration.module.scss';
import ExamRegistrationForm from '@component/components/ExamRegistrationForm/ExamRegistrationForm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { enlistedZone } from '@component/app/Reducers/schoolReducer';

const ExamRegistration = () => {
    // const { zoneInfo, schoolInfo } = useSelector((state) => state.school);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(enlistedZone())
    },[])
    return (
        <div className={styles.registration_design}>
            <Container>
               <ExamRegistrationForm/>
            </Container>
        </div>
    );
};

export default ExamRegistration;