import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';

// Hàm để fetch categories từ server
const fetchCategories = async () => {
  const { data } = await customFetch.get('/categories');
  return data;
};

// Custom hook sử dụng useQuery để fetch categories
export const useCategories = () => {
  return useQuery('categories', fetchCategories);
};
