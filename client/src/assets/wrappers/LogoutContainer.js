import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  .user-ava {
    margin: 0 4px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  .user-ava:hover,
  .dropdown-container:hover .user-ava {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    width: max-content;
    position: absolute;
    right: 4px;
    box-shadow: var(--shadow-2);
    text-align: center;
    display: none;
    background: var(--white);
    z-index: 10;
  }

  .dropdown-container:hover .dropdown {
    display: block;
  }

  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem 0.75rem;
    background: transparent;
    border-color: transparent;
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    height: 100%;
  }

  .dropdown-item {
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 17px;
  }

  .dropdown-item:hover {
    background-color: var(--primary-100);
  }

  .dropdown-item:not(:last-child) {
    border-bottom: 1px solid var(--grey-300);
  }

  .logout {
    cursor: pointer;
  }

  @media screen and (max-width: 1200px) {
    .dropdown-item {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 992px) {
    .user-ava {
      margin: 0;
      padding: 8px;
      svg {
        width: 25px;
        height: 25px;
      }
    }

    .dropdown {
      right: 0;
    }

    .dropdown-item {
      padding: 12px;
    }
  }

  @media screen and (max-width: 481px) {
    .dropdown-item {
      padding: 8px 12px;
      font-size: 15px;
    }
  }
`;

export default Wrapper;
