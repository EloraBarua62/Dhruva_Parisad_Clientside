import { enlistedZone } from '@component/app/Reducers/schoolReducer';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const User = () => {
    const dispatch = useDispatch();
      useEffect(() => {
        dispatch(enlistedZone());
        // dispatch(displayNews());
      }, []);
    return (
      <div>
        banner
        news 
        schools
      </div>
    );
};

export default User;