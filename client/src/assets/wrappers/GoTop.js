import styled from 'styled-components';

const Wrapper = styled.div`
  .go-top-hidden {
    display: none;
  }

  .go-top {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 5%;
    right: 3%;
    width: 45px;
    height: 45px;
    padding: 5px;
    line-height: 30px;
    background-color: var(--primary-500);
    color: var(--white);
    box-shadow: var(--shadow-4);
    border-radius: var(--border-radius-rounded);
    border: none;
    text-align: center;
    cursor: pointer;
    z-index: 1;

    &:hover {
      background-color: var(--primary-600);
    }
  }

  .go-top-icon {
    font-size: 20px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default Wrapper;
