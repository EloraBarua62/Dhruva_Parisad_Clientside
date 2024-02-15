import { enlistedZone } from '@component/app/Reducers/schoolReducer';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const User = () => {
    const dispatch = useDispatch();
      useEffect(() => {
        dispatch(enlistedZone());
      }, []);
    return (
      <div>
        <Link href={`/user/school_registration`}>
          school registration
        </Link>
      </div>
    );
};

export default User;