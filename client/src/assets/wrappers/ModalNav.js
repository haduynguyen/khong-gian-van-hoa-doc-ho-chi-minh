import styled from 'styled-components';

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 10;
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow-y: auto;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }
  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }
  .active {
    color: var(--primary-500);
  }
  header {
    background-color: var(--primary-500);
    color: var(--white);
    padding: 1rem 2rem;
    width: 90%;
    text-align: center;
    border-radius: var(--border-radius);
  }

  .nav-links.responsive {
    position: relative;
    text-align: center;
  }
  .nav-links.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .nav-links.responsive a {
    float: none;
    display: block;
  }
  .nav-links.responsive .dropdown {
    float: none;
  }
  .nav-links.responsive .dropdown .dropdown-content {
    position: relative;
    display: none;
  }

  .nav-links.responsive .dropdown.active {
    background-color: var(--grey-100);
  }

  .nav-links.responsive .dropdown.active .dropdown-content {
    position: relative;
    display: block;
  }

  .nav-links.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    font-size: 16px;
    border: none;
    outline: none;
    padding: 16px;
    background-color: inherit;
    color: var(--text-secondary-color);
    font-family: inherit;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    line-height: 1.5;
    cursor: pointer;
  }

  .nav-links.responsive .dropdown:has(a.active) {
    .dropbtn {
      color: var(--primary-500);
    }
  }

  @media screen and (max-width: 481px) {
    header {
      width: 100%;
    }
  }
`;
export default Wrapper;
