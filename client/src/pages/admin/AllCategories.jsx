/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import SearchContainer from '../../components/admin/SearchCategoryContainer';
import { createContext, useContext } from 'react';
import CategoriesContainer from '../../components/admin/CategoriesContainer';

const allCategoriesQuery = (params) => {
  const { search, status, sort, page } = params;
  return {
    queryKey: [
      'categories',
      search ?? '',
      status ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/categories/filter', {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    await queryClient.ensureQueryData(allCategoriesQuery(params));
    return { searchValues: { ...params } };
  };

const allCategoriesContext = createContext();

export const useAllCategoriesContext = () => {
  return useContext(allCategoriesContext);
};

const AllCategories = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(allCategoriesQuery(searchValues));

  return (
    <allCategoriesContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <CategoriesContainer />
    </allCategoriesContext.Provider>
  );
};

export default AllCategories;
