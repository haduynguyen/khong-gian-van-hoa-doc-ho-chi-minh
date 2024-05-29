import { useState } from 'react';
import Wrapper from '../../assets/wrappers/admin/LogoutContainer';
import { useAdminContext } from '../../pages/admin/AdminLayout';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useAdminContext();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaUserCircle />
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          Đăng xuất
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
