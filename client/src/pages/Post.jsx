import { useParams } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Post';
import { Sidebar } from '../components';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';
import { useEffect } from 'react';
import { useHomeLayoutContext } from './HomeLayout';
import Loading from '../components/Loading';

const fetchPostById = async (id) => {
  const { data } = await customFetch.get(`/posts/${id}`);
  return data;
};

const Post = () => {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  const { setCategoryName } = useHomeLayoutContext();

  useEffect(() => {
    setCategoryName(data?.post?.category?.name || '');
  }, [data, setCategoryName]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <article>
        {data && data?.post?.content ? (
          <div
            dangerouslySetInnerHTML={{ __html: data.post.content }}
            className="ql-editor"
          />
        ) : (
          data?.post?.title
        )}
      </article>
      <Sidebar categoryId={data?.post?.category?._id} qrCode={data?.qrCode} />
    </Wrapper>
  );
};
export default Post;
