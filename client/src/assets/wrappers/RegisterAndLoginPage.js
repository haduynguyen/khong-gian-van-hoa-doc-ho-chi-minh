import styled from 'styled-components';
import redLeafTop from '../images/red-leaf-top.svg';
import redLeafBottom from '../images/red-leaf-bottom.svg';

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  .form-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    &::before {
      content: url(${redLeafTop});
      position: relative;
      top: 0;
      left: 0;
    }
    &::after {
      content: url(${redLeafBottom});
      position: relative;
      align-self: flex-end;
      bottom: -2px;
      right: 0;
    }
  }
  .form {
    width: 90%;
    max-width: 700px;
    align-self: center;
  }
  h4 {
    margin-bottom: 1rem;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 2.5rem;
    text-align: center;
    line-height: 1.5;
  }
  .member-btn {
    color: var(--primary-700);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
    &:hover {
      color: var(--primary-900);
    }
  }
  .form-input,
  .form-textarea,
  .form-select {
    border-radius: var(--border-radius-rounded);
    background: var(--background-color);
    border: 1px solid var(--grey-300);
    color: var(--text-color);
  }
  .btn {
    margin-top: 1rem;
  }
  .img-container {
    width: 40%;
    background-color: var(--primary-500);
    display: flex;
    justify-content: center;
    align-items: flex-end;

    img {
      width: 100%;
    }
  }

  @media screen and (max-width: 1600px) {
    .form {
      max-width: 550px;
    }
  }

  @media screen and (max-width: 1440px) {
    .form {
      max-width: 500px;
    }
  }

  @media screen and (max-width: 768px) {
    .form-container {
      width: 100%;
    }
    .img-container {
      display: none;
    }
  }

  @media screen and (max-width: 640px) {
    h4 {
      font-size: 28px;
    }
    p {
      font-size: var(--small-text);
    }
  }

  @media screen and (max-width: 480px) {
    .form-container {
      /* border-top: 15px solid var(--primary-500); */
      &::before {
        top: -20px;
        left: -10px;
      }
      &::after {
        bottom: -20px;
        right: -10px;
      }
    }
    .form {
      padding: 1rem;
    }
    h4 {
      font-size: 24px;
    }
  }
`;
export default Wrapper;
