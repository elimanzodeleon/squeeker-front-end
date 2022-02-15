import { NetworkStatus } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import PostList from '../components/PostList';
import { Edge, useUserPostsQuery, useUserQuery } from '../generated/graphql';

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;

  const { data: userData, loading: userLoading } = useUserQuery({
    variables: { username: username as string },
  });
  const {
    data: postsData,
    error: postsError,
    fetchMore,
    networkStatus,
  } = useUserPostsQuery({
    variables: { first: 5, username: username as string },
    notifyOnNetworkStatusChange: true,
    // pollInterval: 5000,
  });

  if (networkStatus === NetworkStatus.loading || userLoading) {
    return <p className='text-white text-center'>loading....</p>;
  }

  if (!userData!.user) {
    return (
      <div className='flex flex-col gap-4'>
        <p className='text-white text-center'>This user does not exist</p>
        <Link href='/home'>
          <a className='text-white text-center bg-purple p-2 items-center rounded-md'>
            home
          </a>
        </Link>
      </div>
    );
  }

  if (postsError) {
    return <p className='text-red'>unable to fetch posts</p>;
  }

  const { hasNextPage, endCursor } = postsData!.userPosts.pageInfo;

  return (
    <>
      <h1 className='text-2xl text-purple'>
        {userData!.user!.displayUsername}
      </h1>
      <PostList
        edges={postsData!.userPosts.edges as Edge[]}
        hasNextPage={hasNextPage}
        endCursor={endCursor}
        networkStatus={networkStatus}
        fetchMore={fetchMore}
      />
    </>
  );
};

export default UserProfile;
