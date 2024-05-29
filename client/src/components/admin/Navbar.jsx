import Wrapper from '../../assets/wrappers/admin/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import { useAdminContext } from '../../pages/admin/AdminLayout';
import { LogoutContainer } from '../admin';

const Navbar = () => {
  const { toggleSidebar } = useAdminContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h4 className="logo-text">Admin</h4>
        </div>
        <div className="btn-container">
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
