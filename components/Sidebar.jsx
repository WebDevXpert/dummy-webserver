import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { RiLoginBoxFill } from "react-icons/ri";
import { AiOutlineLogin } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import CarbonopsLogo from './CarbonopsLogo';
import { useDarkMode } from '@/context/DarkmodeContext';

const Sidebar = ({ children }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { darkMode } = useDarkMode()

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const logoutHandler = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/login');
      toast.success("User logged out");
      router.push(apiUrl);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isAuthenticated = () => {
    return session !== null;
  };

  const AuthenticatedLink = ({ href, children }) => {
    if (isAuthenticated()) {
      return <Link href={href}>{children}</Link>;
    } else {
      return null;
    }
  };

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     closeDropdown();
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-gray-100 dark:bg-dark dark:text-white'>
      <div className='flex-grow flex flex-col sm:flex-row'>
        <div className={`sm:w-48 m-0 p-0 ${darkMode ? "bg-light-gray text-sky-50" : "bg-sky-50 text-light-gray"}  overflow-y-auto`}>
          <div className='p-4'>
            <div className='flex items-center justify-center p-3 rounded-full'>
              <CarbonopsLogo darkMode={darkMode} />
            </div>
            <div className='space-y-4'>
              <AuthenticatedLink href='/'>
                <div className='flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg'>
                  <RiBillLine size={20} />
                  <span className='ml-2'>Home</span>
                </div>
              </AuthenticatedLink>
              <AuthenticatedLink href='/BillingForm'>
                <div className='flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg'>
                  <RiBillLine size={20} />
                  <span className='ml-2'>Bill Input</span>
                </div>
              </AuthenticatedLink>

              <div className='relative mt-0' style={{ marginTop: "0!important" }} ref={dropdownRef}>
                {
                  isAuthenticated() &&
                  <button
                    onClick={toggleDropdown}
                    className='text-left flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg'
                  >
                    <div className='flex items-center'>
                      <FaWpforms size={20} />
                      <span className='ml-2'>Site Administration</span>
                    </div>
                  </button>
                }
                {showDropdown && (
                  <div className='absolute bg-white text-black top-full w-full mt-2 rounded-lg shadow-md'>
                    <AuthenticatedLink href='/OnboardForm'>
                      <div className='flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-3'>
                        <FaWpforms size={20} />
                        <span className='ml-2'>Site Onboarding</span>
                      </div>
                    </AuthenticatedLink>
                    <AuthenticatedLink href='/bu'>
                      <div className='flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-3'>
                        <FaWpforms size={20} />
                        <span className='ml-2'>Onboarded List</span>
                      </div>
                    </AuthenticatedLink>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='mt-auto p-4'>
            {isAuthenticated() ? (
              <div className='flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg' onClick={logoutHandler}>
                <AiOutlineLogin size={20} />
                <span className='ml-2'>Logout</span>
              </div>
            ) : (
              <Link href='/login'>
                <div className='flex items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 p-3 rounded-lg'>
                  <RiLoginBoxFill size={20} />
                  <span className='ml-2'>Login</span>
                </div>
              </Link>
            )}
          </div>
        </div>
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
