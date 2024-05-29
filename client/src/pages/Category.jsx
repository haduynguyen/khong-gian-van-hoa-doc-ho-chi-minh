/* eslint-disable react-refresh/only-export-components */
import { redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Post';
import { Sidebar } from '../components';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';
import { useEffect } from 'react';
import { useHomeLayoutContext } from './HomeLayout';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const categoryQuery = (id) => {
  return {
    queryKey: ['category', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/categories/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(categoryQuery(params.categoryId));
      return params.categoryId;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect('/');
    }
  };

const Category = () => {
  const id = useLoaderData();

  const { data, isLoading } = useQuery(categoryQuery(id));

  const { setCategoryName } = useHomeLayoutContext();

  useEffect(() => {
    setCategoryName(data.category.name);
    return () => {
      setCategoryName(null);
    };
  }, [id, data.category.name, setCategoryName]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <article>
        {data?.category && data?.category?.content?.trim() ? (
          <div
            dangerouslySetInnerHTML={{ __html: data.category.content }}
            className="ql-editor"
          />
        ) : (
          data?.category?.name
        )}
      </article>
      <Sidebar qrCode={data?.qrCode}></Sidebar>
    </Wrapper>
  );
};
export default Category;
