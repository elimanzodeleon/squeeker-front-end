import { gql } from '@apollo/client';
import React, { useState } from 'react';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { ClipLoader } from 'react-spinners';
import {
  HomePostsDocument,
  HomePostsQuery,
  useVotePostMutation,
} from '../generated/graphql';

interface Props {
  id: string;
  username: string;
  voteStatus: string;
  points: number;
}

const Vote: React.FC<Props> = ({ id, username, voteStatus, points }) => {
  // state to control whether we display a loading spineer on the upvote/downvote button
  const [loadingState, setLoadingState] = useState<
    'upvote-loading' | 'downvote-loading' | 'not-loading'
  >('not-loading');
  const [
    votePost,
    { data: voteData, loading: voteLoading, error: voteError },
  ] = useVotePostMutation();

  const handleVote = async (postId: string, value: number) => {
    if (value === 1) {
      setLoadingState('upvote-loading');
    } else {
      setLoadingState('downvote-loading');
    }
    await votePost({
      variables: { postId, value },
    });
    setLoadingState('not-loading');
  };
  return (
    <div className='flex flex-col text-center'>
      {loadingState === 'upvote-loading' ? (
        <div className='px-1'>
          <ClipLoader color='#bb86fc' size={16} />
        </div>
      ) : (
        <button
          onClick={() => handleVote(id, 1)}
          disabled={voteLoading}
          className='hover:bg-gray rounded-md p-1'
        >
          <MdExpandLess
            className={`w-4 h-4 ${
              voteStatus === 'UP_VOTE' ? 'text-purple' : 'text-white'
            }`}
          />
        </button>
      )}
      <p className='text-xl text-white'>{points}</p>
      {loadingState === 'downvote-loading' ? (
        <div className='px-1'>
          <ClipLoader color='#b00020' size={16} />
        </div>
      ) : (
        <button
          onClick={() => handleVote(id, -1)}
          disabled={voteLoading}
          className='hover:bg-gray rounded-md p-1'
        >
          <MdExpandMore
            className={`w-4 h-4 ${
              voteStatus === 'DOWN_VOTE' ? 'text-red' : 'text-white'
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default Vote;
