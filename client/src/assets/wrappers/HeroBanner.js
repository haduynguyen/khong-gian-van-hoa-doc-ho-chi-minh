import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: var(--primary-600);
  width: 100vw;

  .banner-container {
    padding: 50px 1.5rem 60px;
  }

  .banner {
    margin: 0 auto;
    max-width: 1280px;
    font-size: 0;
  }

  .banner-img {
    max-width: 100%;
    user-select: none;
  }

  @media screen and (max-width: 1200px) {
    .banner-container {
      padding: 30px 1rem 40px;
    }
  }

  @media screen and (max-width: 1024px) {
    .banner-container {
      padding: 1rem;
    }
  }
`;

export default Wrapper;
