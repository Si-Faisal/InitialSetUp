import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Components/Header/Header';
import FooterOne from '../Components/Footer/FooterOne';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenToAuthChanges } from '../Redux/Slice/FirebaseAuthSlice';
import { AppDispatch } from 'Redux/Store/store';

interface OutletProps {
    context?: unknown;
  }
  declare function Outlet(
    props: OutletProps
  ): React.ReactElement | null;


const MainLayout = () => {
  

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(listenToAuthChanges())
  },[dispatch,listenToAuthChanges ])

  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
           {noHeaderFooter ? "": <Header></Header>}
           <Outlet/>
            {noHeaderFooter ? "" : <FooterOne></FooterOne>}
            
        </div>
    );
};

export default MainLayout;