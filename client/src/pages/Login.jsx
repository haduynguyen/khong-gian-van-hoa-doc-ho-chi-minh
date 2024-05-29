/* eslint-disable react-refresh/only-export-components */
import { Form, Link, json, redirect, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow } from '../components';
import portraictImg from '../assets/images/portrait-bac-ho.png';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const fetchCurrentUser = async () => {
  const { data } = await customFetch.get('/users/current-user');
  return data;
};

export const loader = async () => {
  try {
    const data = await fetchCurrentUser();
    if (data.user !== null) {
      return redirect('/');
    }

    return json({});
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect('/');
  }
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      const res = await customFetch.post('/auth/login', data);

      toast.success('Đăng nhập thành công!');

      if (res.status === 200) {
        const userData = await fetchCurrentUser();
        queryClient.setQueryData(['current-user'], userData);

        const previousPage = queryClient.getQueryData('previous-page');

        if (previousPage) {
          queryClient.setQueryData('previous-page', null);
          navigate(previousPage);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="form-container">
        <Form method="post" className="form" onSubmit={handleSubmit}>
          <h4>Đăng nhập</h4>
          <p>
            Chưa có tài khoản?
            <Link to="/register" className="member-btn">
              Đăng ký
            </Link>
          </p>
          <FormRow type="email" name="email" labelText="Email" />
          <FormRow type="password" name="password" labelText="Mật khẩu" />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            Đăng nhập
          </button>
        </Form>
      </div>
      <div className="img-container">
        <img src={portraictImg} alt="Anh Bac Ho" />
      </div>
    </Wrapper>
  );
};
export default Login;
