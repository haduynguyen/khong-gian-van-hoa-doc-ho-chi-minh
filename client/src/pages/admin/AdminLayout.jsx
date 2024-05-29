/* eslint-disable react-refresh/only-export-components */
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/Admin';
import { BigSidebar, Navbar, SmallSidebar } from '../../components/admin';
import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from '../../utils/customFetch';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const currentUserQuery = {
  queryKey: ['current-user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/current-user');
    return data;
  },
};

export const loader = (queryClient) => async () => {
  let currentUserData = null;

  try {
    currentUserData = await queryClient.ensureQueryData(currentUserQuery);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      queryClient.setQueryData('current-user', null);
    }
  }
  return { currentUserData };
};

const AdminContext = createContext();

const AdminLayout = () => {
  const { currentUserData } = useLoaderData();

  const user = currentUserData?.user;

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await customFetch.get('/auth/logout');
    await queryClient.setQueryData(['current-user'], null);
    navigate('/');
    toast.success('Đăng xuất thành công');
    window.location.reload();
  };

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <AdminContext.Provider
      value={{ user, showSidebar, toggleSidebar, logoutUser }}
    >
      <Wrapper>
        <main className="admin">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="admin-page">
              {user && user.role === 'admin' && <Outlet />}
            </div>
          </div>
        </main>
      </Wrapper>
    </AdminContext.Provider>
  );
};
export const useAdminContext = () => useContext(AdminContext);
export default AdminLayout;
