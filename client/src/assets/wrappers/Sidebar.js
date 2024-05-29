import styled from 'styled-components';

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 70px;

  .widget-title {
    padding-bottom: 1rem;
    font-size: 20px;
    font-weight: bold;
    color: var(--primary-900);
    text-align: center;
    border-bottom: 5px solid var(--primary-900);
  }

  .widget-list {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .post-item {
    display: flex;
    align-items: center;
  }

  .post-no {
    width: 35px;
    padding: 5px 1rem 5px 0px;
    margin-right: 1rem;
    font-size: 20px;
    font-weight: bold;
    border-right: 1px solid black;
  }

  .post-title {
    font-size: 16px;
    font-weight: bold;
    color: var(--text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .post-title:hover {
    text-decoration: underline;
  }

  .view-more {
    margin: 16px auto 0;
    display: block;
    text-align: center;
    text-decoration: underline;
    color: var(--primary-900);
    font-size: 16px;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .view-more:hover {
    color: var(--primary-500);
  }

  .qr-code {
    display: block;
    margin: 0 auto;
    width: 200px;
  }

  .widget-empty {
    text-align: center;
    font-size: 16px;
  }

  @media screen and (max-width: 992px) {
    gap: 50px;

    .widget-qr {
      order: -1;
    }
  }
`;

export default Wrapper;
