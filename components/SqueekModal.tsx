import React from 'react';
import Modal from './Modal';
import {
  Edge,
  HomePostsDocument,
  HomePostsQuery,
  Post,
  useCreatePostMutation,
  UserPostsDocument,
  UserPostsQuery,
} from '../generated/graphql';
import { motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { Formik, Form } from 'formik';
import { CreatePostSchema } from '../lib/yup';
import TextField from './TextField';

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: string | undefined;
}

const SqueekModal: React.FC<Props> = ({ setIsModalOpen, currentUser }) => {
  const [createPost, { data, loading, error }] = useCreatePostMutation();

  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <div className='pt-8'>
        <Formik
          // serverError is only used to create an error when the mutation was unsuccessful
          initialValues={{ text: '', serverError: '' }}
          onSubmit={async (values, { setErrors }) => {
            // if there is no currentUser prop(ie undefined, simply set error to please log in and return)
            if (!currentUser) {
              setErrors({ serverError: 'Please log in before posting' });
              return;
            }

            const res = await createPost({
              variables: values,
              update: (cache, { data }) => {
                if (!data?.createPost.post) return;

                const newPost = {
                  ...data.createPost.post,
                };

                const prev = cache.readQuery<HomePostsQuery>({
                  query: HomePostsDocument,
                });

                // update home posts query
                cache.updateQuery<HomePostsQuery>(
                  { query: HomePostsDocument },
                  prevData => {
                    // TODO -> i think there may be nothing in the cache so prevData will be null if there are no posts in the db
                    const pageInfo = prevData!.homePosts.pageInfo;
                    const edges = prevData!.homePosts.edges;
                    const newEdge: Edge = {
                      cursor: newPost.id,
                      node: newPost as Post,
                    };
                    return {
                      homePosts: {
                        pageInfo,
                        edges: [newEdge, ...edges],
                      },
                    };
                  }
                );

                // we will handle updating the users posts cache differently,
                // if data for users posts in cache is null, simply return null
                // if the users posts exists in cache, then we add the new post to the users cache
                const usersPostsInCache = cache.readQuery<UserPostsQuery>({
                  query: UserPostsDocument,
                  variables: { username: currentUser },
                });

                if (!!usersPostsInCache) {
                  const pageInfo = usersPostsInCache!.userPosts.pageInfo;
                  const edges = usersPostsInCache!.userPosts.edges;
                  const newEdge: Edge = {
                    cursor: newPost.id,
                    node: newPost as Post,
                  };
                  const newData = {
                    userPosts: {
                      pageInfo,
                      edges: [newEdge, ...edges],
                    },
                  };
                  // cache does contain users posts so add the current post to their cache entry
                  cache.writeQuery<UserPostsQuery>({
                    query: UserPostsDocument,
                    variables: { username: currentUser },
                    data: newData,
                  });

                  const p = cache.readQuery<UserPostsQuery>({
                    query: UserPostsDocument,
                    variables: { username: 'eli' },
                  });
                  console.log('user cache after adding new post', p);
                } else {
                  // currently no item in cache for users posts so return
                  return;
                }
              },
            });
            if (!res.data?.createPost.success) {
              setErrors({ serverError: res.data?.createPost.message });
            } else {
              setIsModalOpen(false);
            }
          }}
          validationSchema={CreatePostSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isSubmitting, errors, values }) => (
            <Form className='flex flex-col gap-4'>
              {Object.keys(errors).length !== 0 && (
                <div className='-mt-2'>
                  {Object.values(errors).map((error, idx) => (
                    <p key={idx} className='text-red text-md'>
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <TextField
                textArea
                maxLength='160'
                autoFocus
                rows='4'
                type='text'
                name='text'
                placeholder={"What's happening?"}
              />
              <motion.button
                type='submit'
                whileTap={{ scale: 0.95 }}
                className='text-white text-xl py-2 rounded-md border-2 border-gray bg-purple'
                disabled={isSubmitting || values.text.length === 0}
              >
                {isSubmitting ? (
                  <ClipLoader
                    color='#e4e6eb'
                    loading={isSubmitting}
                    size={16}
                  />
                ) : (
                  'Squeek'
                )}
              </motion.button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default SqueekModal;
