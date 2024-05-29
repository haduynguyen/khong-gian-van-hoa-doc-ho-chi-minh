/* eslint-disable react/prop-types */
import { FaCaretDown, FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/ModalNav';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const ModalNav = ({ user, categoriesList, showNavbar, toggleNavbar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleClose = () => {
    toggleNavbar();
    setShowDropdown(false);
  };

  return (
    <Wrapper>
      <div
        className={
          showNavbar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleClose}>
            <FaTimes />
          </button>
          <header>KGVHĐ HCM</header>
          <div className="nav-links responsive">
            <NavLink to="/" className="nav-link" onClick={toggleClose}>
              Trang chủ
            </NavLink>
            <div className={showDropdown ? 'dropdown active' : 'dropdown'}>
              <button className="dropbtn" onClick={toggleDropdown}>
                Danh mục bài viết
                <FaCaretDown />
              </button>
              <div className="dropdown-content">
                {categoriesList?.map((item) => {
                  const { _id, name } = item;
                  return (
                    <NavLink
                      to={`/category/${_id}`}
                      key={name}
                      className="nav-link"
                      onClick={toggleClose}
                    >
                      {name}
                    </NavLink>
                  );
                })}
              </div>
            </div>
            <NavLink to="/contest" className="nav-link" onClick={toggleClose}>
              Thi trực tuyến
            </NavLink>
            {!user?.name && (
              <NavLink to="/login" className="nav-link" onClick={toggleClose}>
                Đăng nhập
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default ModalNav;
