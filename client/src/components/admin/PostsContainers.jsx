import Post from './Post';
import Wrapper from '../../assets/wrappers/admin/PostsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useAllPostsContext } from '../../pages/admin/AllPosts';
const PostsContainer = () => {
  const { data } = useAllPostsContext();

  const { posts, totalPosts, numOfPages } = data;
  if (posts.length === 0) {
    return (
      <Wrapper>
        <h2>Không có bài viết nào để hiển thị!</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Có tất cả {totalPosts} bài viết</h5>
      <div className="posts">
        {posts.map((post) => {
          return <Post key={post._id} {...post} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer type="post" />}
    </Wrapper>
  );
};
export default PostsContainer;
