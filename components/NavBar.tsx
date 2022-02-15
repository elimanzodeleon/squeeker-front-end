import React, { useState } from 'react';
import Link from 'next/link';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLogOutMutation,
  useCurrentUserQuery,
} from '../generated/graphql';
import { useRouter } from 'next/router';
import SqueekModal from './SqueekModal';
import Forgot from './ForgotPasswordModal';

const NavBar = () => {
  const [isSqueekModalOpen, setIsSqueekModalOpen] = useState(false);
  const router = useRouter();
  const { data, loading, error } = useCurrentUserQuery();

  if (error) {
    console.log('currentuser query error: ', error);
  }

  console.log('user query result: ', data);

  const [
    logOut,
    { data: logOutData, loading: loadingData, error: logOutError, client },
  ] = useLogOutMutation();
  if (loading || data?.currentUser === null) {
    return <></>;
  }

  const handeLogout = async () => {
    // query server that user has logged out so that the session is removed from redis
    await logOut({
      update: cache => {
        const currentUserBeforeLogout = cache.readQuery<CurrentUserQuery>({
          query: CurrentUserDocument,
        });

        // immediately set the me query to be null so that the navbar doesnt render for a short period after user is routed to landing page
        cache.writeQuery<CurrentUserQuery>({
          query: CurrentUserDocument,
          data: {
            __typename: 'Query',
            currentUser: null,
          },
        });
      },
    });
    // clear the cache so that user has fresh cache upon loggin in?
    await client.cache.reset();
    // push user to landing page
    router.push('/');
  };

  return (
    // nav wrapper
    <div className='flex justify-center py-4 mb-4 bg-dark-gray shadow-lg sticky top-0'>
      {/* navbar content wrapper */}
      <div className='flex justify-between items-center w-full sm:w-3/4 md:w-1/2 lg:w-2/6'>
        <Link href='/home'>
          <a className='text-purple text-2xl'>squeeker</a>
        </Link>
        <div className='flex gap-2'>
          {/* <button
            className='text-white text-xl p-1 rounded-md  bg-purple'
            onClick={() => setIsSqueekModalOpen(true)}
          >
            squeek
          </button> */}
          <button className='text-gray' onClick={handeLogout}>
            log out
          </button>

          <Link href={`/${data!.currentUser!.username}`}>
            <a className='text-white'>profile</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
