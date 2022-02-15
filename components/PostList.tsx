import { NetworkStatus } from '@apollo/client';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from 'react-spinners';
import { Edge } from '../generated/graphql';
import Post from './Post';

interface Props {
  edges: Edge[];
  hasNextPage: boolean;
  endCursor: string | undefined | null;
  networkStatus: NetworkStatus;
  fetchMore: any;
}

const PostList: React.FC<Props> = ({
  edges,
  hasNextPage,
  endCursor,
  networkStatus,
  fetchMore,
}) => {
  const loading = networkStatus === NetworkStatus.fetchMore;

  return (
    <>
      <div className='flex flex-col gap-4 py-4 w-full'>
        {edges.map(edge => (
          <Post key={edge.cursor} post={edge.node} />
        ))}
      </div>
      {hasNextPage && (
        <button
          className='text-purple text-lg'
          disabled={loading}
          onClick={() => fetchMore({ variables: { after: endCursor } })}
        >
          {loading ? (
            <ClipLoader color='#bb86fc' loading={loading} size={16} />
          ) : (
            'More'
          )}
        </button>
      )}
    </>
  );
};

export default PostList;
