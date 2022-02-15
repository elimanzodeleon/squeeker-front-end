import React from 'react';
import { ClipLoader } from 'react-spinners';
import {
  HomePostsDocument,
  HomePostsQuery,
  useDeletePostMutation,
} from '../generated/graphql';

interface Props {
  postId: string;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dref: React.MutableRefObject<any>;
}

const PostSettingsDropdown: React.FC<Props> = ({
  postId,
  setDropdownOpen,
  dref,
}) => {
  const [deletePost, { data, loading, error }] = useDeletePostMutation();

  const handleDeletePost = async () => {
    // console.log('TODO delete post');

    await deletePost({
      variables: { id: postId },

      update: cache => {
        const prev = cache.readQuery<HomePostsQuery>({
          query: HomePostsDocument,
        });

        // simpler version of deleting the post (more difficult version usingwrite query below)
        cache.evict({ id: `Post:${postId}` });
        // clean up the cache by removing unreachable objects (such as the one we just deleted)
        cache.gc();

        // cache.writeQuery<HomePostsQuery>({
        //   query: HomePostsDocument,
        //   data: {
        //     homePosts: {
        //       pageInfo: {
        //         // TODO need to check if the item that was deleted was the last one so we could update the
        //         // cache accordingly(specifically, the endCursor). for now, DONT delete the last squeek
        //         hasNextPage: prev!.homePosts.pageInfo.hasNextPage,
        //         endCursor: prev!.homePosts.pageInfo.endCursor,
        //       },
        //       edges: prev!.homePosts.edges.filter(
        //         edge => edge!.cursor !== postId
        //       ),
        //     },
        //   },
        // });
      },
    });
  };

  return (
    <div className='absolute top-0 right-0 sm:left-0 sm:right-auto flex rounded px-2 py-1 bg-gray padding-2 shadow-lg'>
      {loading ? (
        <ClipLoader color='#b00020' size={16} />
      ) : (
        <p className='text-red' onClick={handleDeletePost} ref={dref}>
          delete
        </p>
      )}
    </div>
  );
};

export default PostSettingsDropdown;
