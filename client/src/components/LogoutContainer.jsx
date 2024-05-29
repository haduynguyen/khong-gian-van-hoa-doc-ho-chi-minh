import Wrapper from '../assets/wrappers/LogoutContainer';
import { FaUserCircle } from 'react-icons/fa';
import { useHomeLayoutContext } from '../pages/HomeLayout';
import { MdOutlineLogout } from 'react-icons/md';
import { FaRegCircleUser } from 'react-icons/fa6';

const LogoutContainer = () => {
  const { currentUserData, logout } = useHomeLayoutContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <Wrapper>
      <div className="dropdown-container">
        <div className="user-ava">
          <FaUserCircle />
        </div>
        <div className="dropdown">
          <div className="dropdown-item">
            <FaRegCircleUser />
            {currentUserData?.user?.name || ''}
          </div>
          <div className="dropdown-item logout" onClick={handleLogout}>
            <MdOutlineLogout />
            Đăng xuất
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
