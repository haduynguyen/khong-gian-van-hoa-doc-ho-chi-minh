/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import SearchContainer from '../../components/admin/SearchPostContainter';
import { createContext, useContext, useEffect, useState } from 'react';
import PostsContainer from '../../components/admin/PostsContainers';

const allPostsQuery = (params) => {
  const { search, postStatus, category, sort, page } = params;
  return {
    queryKey: [
      'posts',
      search ?? '',
      postStatus ?? 'all',
      category ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/posts', {
        params,
      });
      return data;
    },
  };
};

const getCategories = async () => {
  const { data } = await customFetch.get('/categories');
  return data;
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allPostsQuery(params));
    return { searchValues: { ...params } };
  };

const allPostsContext = createContext();

const AllPosts = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(allPostsQuery(searchValues));

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <allPostsContext.Provider value={{ data, searchValues, categories }}>
      <SearchContainer />
      <PostsContainer />
    </allPostsContext.Provider>
  );
};

export const useAllPostsContext = () => {
  return useContext(allPostsContext);
};
export default AllPosts;
