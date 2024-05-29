import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: calc(100vh);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);

  main {
    width: 100%;
    max-width: 1280px;
    min-height: 50vh;
    margin: 60px auto 70px;
    padding: 0 40px;
    font-size: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .category-name-container {
    width: 100%;
    height: 87px;
    padding: 24px;
    background-color: var(--primary-900);
    color: var(--white);
    font-weight: bold;
    text-align: center;
    overflow: hidden;
    position: relative;
  }

  .category-name {
    position: absolute;
    top: 0;
    left: 100%;
    width: max-content;
    height: 100%;
    margin: 0;
    font-size: 26px;
    line-height: 87px;
    text-align: center;
    -moz-animation: scroll-left 20s linear infinite;
    -webkit-animation: scroll-left 20s linear infinite;
    animation: scroll-left 20s linear infinite;
  }

  /* Move it (define the animation) */
  @-moz-keyframes scroll-left {
    0% {
      left: 100%;
    }
    100% {
      left: 0;
      -moz-transform: translateX(-100%);
    }
  }

  @-webkit-keyframes scroll-left {
    0% {
      left: 100%;
    }
    100% {
      left: 0;
      -webkit-transform: translateX(-100%);
    }
  }

  @keyframes scroll-left {
    0% {
      left: 100%;
    }
    100% {
      left: 0;
      transform: translateX(-100%);
    }
  }

  @media screen and (max-width: 1440px) {
    main {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 1200px) {
    .category-name-container {
      height: 81px;
    }
    .category-name {
      line-height: 81px;
      font-size: 22px;
    }
  }

  @media screen and (max-width: 1024px) {
    .category-name-container {
      height: 65px;
      padding: 16px 20px;
    }

    .category-name {
      font-size: 20px;
      line-height: 65px;
    }

    main {
      margin: 40px auto 50px;
    }
  }

  @media screen and (max-width: 768px) {
    .category-name-container {
      height: 59px;
    }

    .category-name {
      font-size: 18px;
      line-height: 59px;
    }

    main {
      font-size: 16px;
      margin: 30px auto 50px;
      padding: 0 24px;
    }
  }

  @media screen and (max-width: 481px) {
    .category-name-container {
      height: 56px;
    }

    .category-name {
      font-size: 16px;
      line-height: 56px;
    }
  }
`;

export default Wrapper;
