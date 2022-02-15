import React from 'react';
import NavBar from './NavBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className='w-full h-screen overflow-scroll min-h-[700px] bg-black'>
      <NavBar />
      {/* container for the actual content (squeek list, profile, etc) */}
      <div className='flex flex-col items-center text-white w-full sm:w-3/4 md:w-1/2 lg:w-2/6 m-auto mb-4'>
        {children}
      </div>
    </div>
  );
};

export default Layout;
