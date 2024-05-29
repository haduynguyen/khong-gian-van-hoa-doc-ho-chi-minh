import Wrapper from '../../assets/wrappers/admin/BigSidebar';
import NavLinks from './NavLinks';
import { useAdminContext } from '../../pages/admin/AdminLayout';
import { Link } from 'react-router-dom';

const BigSidebar = () => {
  const { showSidebar } = useAdminContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Link to="/">KGVHĐ Hồ Chí Minh</Link>
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
