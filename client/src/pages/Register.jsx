import { Form, Link, json, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow } from '../components';
import customFetch from '../utils/customFetch';
import portraictImg from '../assets/images/portrait-bac-ho.png';
import { toast } from 'react-toastify';

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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/auth/register', data);
    toast.success('Đăng ký thành công!');
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <div className="form-container">
        <Form className="form" method="post">
          <h4>Đăng ký tài khoản</h4>
          <p>
            Đã có tài khoản?
            <Link to="/login" className="member-btn">
              Đăng nhập
            </Link>
          </p>
          <FormRow type="text" name="name" labelText="Họ và tên" />
          <FormRow type="email" name="email" labelText="Email" />
          <FormRow
            type="password"
            name="password"
            labelText="Mật khẩu"
            isRegister={true}
          />{' '}
          <button type="submit" className="btn btn-block">
            Đăng ký
          </button>
        </Form>
      </div>
      <div className="img-container">
        <img src={portraictImg} alt="Anh Bac Ho" />
      </div>
    </Wrapper>
  );
};
export default Register;
