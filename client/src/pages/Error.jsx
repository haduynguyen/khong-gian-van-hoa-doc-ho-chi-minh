import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.png';
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ồ! Không tìm thấy trang!</h3>
          <p>Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm</p>
          <Link to="/">Quay về trang chủ</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Có lỗi xảy ra</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
