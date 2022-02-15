import Link from 'next/link';
import React from 'react';
import {
  Post,
  PostSnippetFragment,
  useCurrentUserQuery,
} from '../generated/graphql';
import { timeSincePosted } from '../utils/timeSincePosted';
import Vote from './Vote';
import PostSettings from './PostSettings';

interface Props {
  post: PostSnippetFragment;
}

const Post: React.FC<Props> = ({ post }) => {
  const { data } = useCurrentUserQuery();
  const {
    user: { username, displayUsername, id: creatorId },
    id,
    createdAt,
    text,
    voteStatus,
    points,
  } = post;
  return (
    <div className='flex bg-dark-gray pr-4 pl-2 py-2 shadow-lg sm:rounded-md gap-2 '>
      {/* upvote/downvote container */}
      <Vote
        id={id}
        username={username}
        voteStatus={voteStatus}
        points={points}
      />
      {/* username+post text wrapper */}
      <div className='flex flex-col items-start flex-1 gap-1'>
        {/* username+date+settingsdropdown? container */}
        <div className='flex w-full justify-between'>
          <div className='flex gap-2'>
            <Link href={`/${username}`}>
              <a className='text-purple text-base'>@{displayUsername}</a>
            </Link>
            <p className='text-base text-gray'>
              {timeSincePosted(parseInt(createdAt as string))}
            </p>
          </div>
          {/* only show PostSettings if current user is author of post */}
          {data?.currentUser?.id === creatorId && <PostSettings postId={id} />}
        </div>
        <div className='w-full border-t-2 border-gray' />
        <p className='text-white text-xl leading-none'>{text}</p>
      </div>
    </div>
  );
};

export default Post;
