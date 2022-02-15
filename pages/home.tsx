import { NetworkStatus } from '@apollo/client';
import React, { useState } from 'react';
import { NextPage } from 'next';
import {
  Edge,
  useCurrentUserQuery,
  useHomePostsQuery,
} from '../generated/graphql';
import SqueekModal from '../components/SqueekModal';
import PostList from '../components/PostList';

const Home: NextPage = () => {
  const {
    data: currentUserData,
    loading: currentUserLoading,
    error: currentUserError,
  } = useCurrentUserQuery();
  const [isSqueekModalOpen, setIsSqueekModalOpen] = useState(false);
  const { data, error, fetchMore, networkStatus } = useHomePostsQuery({
    variables: { first: 20 },
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000, // poll for new message every 5 seconds (could alt use subscriptions)
  });

  if (networkStatus === NetworkStatus.loading) {
    return <p className='text-white text-center'>loading....</p>;
  }

  if (error) {
    return <p className='text-red'>unable to fetch posts</p>;
  }

  return (
    <>
      <button
        className='mr-auto text-white text-xl p-1 rounded-md  bg-purple'
        onClick={() => setIsSqueekModalOpen(true)}
      >
        squeek
      </button>
      {isSqueekModalOpen && (
        <SqueekModal
          setIsModalOpen={setIsSqueekModalOpen}
          currentUser={currentUserData?.currentUser?.username}
        />
      )}
      {data && data.homePosts && (
        <PostList
          edges={data.homePosts.edges as Edge[]}
          hasNextPage={data.homePosts.pageInfo.hasNextPage}
          endCursor={data.homePosts.pageInfo.endCursor}
          networkStatus={networkStatus}
          fetchMore={fetchMore}
        />
      )}
    </>
  );
};

export default Home;
