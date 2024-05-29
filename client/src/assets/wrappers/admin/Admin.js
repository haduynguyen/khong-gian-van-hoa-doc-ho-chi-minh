import styled from 'styled-components';

const Wrapper = styled.section`
  .admin {
    display: grid;
    grid-template-columns: 1fr;
  }
  .admin-page {
    min-height: calc(100vh - 96px);
    margin: 0 auto;
    padding: 2rem 5vw;
    background-color: var(--grey-50);
  }
  @media (min-width: 992px) {
    .admin {
      grid-template-columns: auto 1fr;
    }
    .admin-page {
      padding: 2rem 5%;
    }
  }
`;
export default Wrapper;
