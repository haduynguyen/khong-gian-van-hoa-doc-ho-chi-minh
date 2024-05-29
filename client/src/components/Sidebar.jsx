/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Sidebar';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchNewestPosts = async ({ queryKey }) => {
  const [, { limit }] = queryKey;

  const { data } = await customFetch.get(`/posts/newest?limit=${limit}`);
  return {
    posts: data.posts,
    total: data.totalPosts,
  };
};

const fetchRelatedPosts = async ({ queryKey }) => {
  const [, { categoryId, limit }] = queryKey;

  const { data } = await customFetch.get(
    `/posts/category/${categoryId}?limit=${limit}`
  );
  return {
    posts: data.posts,
    total: data.totalPosts,
  };
};

const Sidebar = ({ categoryId, qrCode }) => {
  const { categoryId: categoryIdParam, postId } = useParams();

  const [limitNewest, setLimitNewest] = useState(5);
  const [limitRelated, setLimitRelated] = useState(5);

  categoryId = categoryId || categoryIdParam;

  const { data: relatedPostsData } = useQuery({
    queryKey: ['relatedPosts', { categoryId, limit: limitRelated }],
    queryFn: fetchRelatedPosts,
    enabled: !!categoryId,
  });

  const { posts: relatedPosts, total: relatedPostsTotal } = relatedPostsData
    ? !postId
      ? relatedPostsData
      : {
          posts: relatedPostsData.posts.filter((item) => item._id !== postId),
          total:
            relatedPostsData.total -
            relatedPostsData.posts.filter((item) => item._id === postId).length,
        }
    : {
        posts: [],
        total: 0,
      };

  const { data: newestPostsData } = useQuery({
    queryKey: ['newestPosts', { limit: limitNewest }],
    queryFn: fetchNewestPosts,
    enabled: !!categoryId,
  });

  const { posts: newestPosts, total: newestPostsTotal } = newestPostsData || {
    posts: [],
    total: 0,
  };

  const handleViewMoreNewest = () => {
    setLimitNewest((prevLimit) => prevLimit + 5);
  };

  const handleViewMoreRelated = () => {
    setLimitRelated((prevLimit) => prevLimit + 5);
  };

  return (
    <Wrapper>
      <div className="widget">
        <div className="widget-title">Bài viết cùng mục khác</div>
        <div className="widget-list">
          {relatedPosts && relatedPosts.length !== 0 ? (
            <>
              {relatedPosts.map((item, index) => (
                <div className="post-item" key={'related post ' + index}>
                  <div className="post-no">{index + 1}.</div>
                  <Link to={`/post/${item._id}`} className="post-title">
                    {item.title}
                  </Link>
                </div>
              ))}
              {relatedPostsTotal > relatedPosts.length && (
                <button
                  type="butotn"
                  className="view-more"
                  onClick={handleViewMoreRelated}
                >
                  Xem thêm
                </button>
              )}
            </>
          ) : (
            <div className="widget-empty">Không có bài viết nào</div>
          )}
        </div>
      </div>
      <div className="widget">
        <div className="widget-title">Bài viết mới nhất</div>
        <div className="widget-list">
          {newestPosts && newestPosts.length !== 0 ? (
            <>
              {newestPosts.map((item, index) => (
                <div className="post-item" key={'newest posts ' + index}>
                  <div className="post-no">{index + 1}.</div>
                  <Link to={`/post/${item._id}`} className="post-title">
                    {item.title}
                  </Link>
                </div>
              ))}
              {newestPostsTotal > newestPosts.length && (
                <button
                  type="butotn"
                  className="view-more"
                  onClick={handleViewMoreNewest}
                >
                  Xem thêm
                </button>
              )}
            </>
          ) : (
            <div className="widget-empty">Không có bài viết nào</div>
          )}
        </div>
      </div>
      <div className="widget widget-qr">
        <div className="widget-title">Quét QR bài viết</div>
        <img
          className="qr-code"
          src={qrCode ? qrCode : null}
          alt="category qr"
        />
      </div>
    </Wrapper>
  );
};
export default Sidebar;
