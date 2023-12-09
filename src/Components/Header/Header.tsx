import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import NavTablist from './NavTablist';
import { listenToAuthChanges,UserLogOut } from '../../Redux/Slice/FirebaseAuthSlice';
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch, RootState } from 'Redux/Store/store';





const Header: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isprofileToggle,setProfileToggle]= useState(false);
  const profileDropdownRef = useRef(null);
// console.log(isprofileToggle);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const user = useSelector((state : RootState) => state.fireBaseAuth);
  const dispatch = useDispatch<AppDispatch>();


 

 

    return (
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
        <a href="#" className="flex items-center">
          <img
            src="https://www.svgrepo.com/show/499962/music.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Landwind Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Landwind
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <div className="hidden mt-2 mr-4 sm:inline-block">
            <span></span>
          </div>
          <div className='flex  justify-center items-center gap-2 relative '>
          { user.user !== null ?<div>
            <div id="avatar" onClick={()=>setProfileToggle(!isprofileToggle)} className="avatar">
            <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          
          {isprofileToggle && (
          <div id="profile-dropdown"  ref={profileDropdownRef}  className=" absolute w-36 right-0 mt-3 space-y-1 bg-gray-200 z-10">
            <Link to="" className="block rounded-md py-2 px-2 font-medium text-gray-900 hover:text-pink-500 hover:border-b-2 hover:border-indigo-500">
              Your Profile
            </Link>
            <Link to=""   onClick={() => dispatch(UserLogOut())} className="block rounded-md py-2 px-2 font-medium text-gray-900 hover:text-pink-500 hover:border-b-2 hover:border-indigo-500">
              Sign out
            </Link>
          </div>
        )}
                
                </div>  : <><Link
            to="/login"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
          >
            LogIn
          </Link>
          <Link
            to="/signup"
            className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
          >
           SignUp
          </Link></>}
          

          </div>

          
          <button

            onClick={toggleMenu}
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isOpen ? 'true' : 'false'}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ?    <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>:  <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>  }
           
           
          </button>
        </div>
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            isOpen ? 'block' : 'hidden lg:block'
          }`}
          id="mobile-menu-2"
        >
          <NavTablist></NavTablist>
        </div>
      </div>
    </nav>
    );
};

export default Header;