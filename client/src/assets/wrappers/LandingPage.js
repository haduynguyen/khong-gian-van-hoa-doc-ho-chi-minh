import styled from 'styled-components';

const Wrapper = styled.div`
  .introduce-section img {
    max-width: 100%;
    margin: 50px auto;
  }

  .category-list-section h4 {
    width: max-content;
    margin: 80px auto 60px;
    color: var(--primary-900);
    border-bottom: 2px solid var(--primary-900);
    font-size: 32px;
  }

  .category-list {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .category-item {
    width: 100%;
    display: flex;
    gap: 50px;
    align-items: flex-start;
  }

  .category-img {
    width: 40%;
    object-fit: contain;
  }

  .category-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .category-title {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 22px;
    text-align: center;
  }

  .category-description {
    text-align: justify;
    white-space: pre-wrap;
  }

  @media screen and (max-width: 768px) {
    .introduce-section img {
      margin: 30px auto;
    }

    .category-list-section h4 {
      margin: 60px auto 40px;
      font-size: 28px;
    }

    .category-list {
    }

    .category-item {
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .category-img {
      width: 80%;
      order: 1;
    }

    .category-title {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 481px) {
    .category-img {
      width: 100%;
    }
  }
`;

export default Wrapper;
