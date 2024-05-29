import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  margin-top: auto;
  padding: 30px 20px;
  background-color: var(--primary-900);
  color: var(--white);
  text-align: center;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-transform: uppercase;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }
`;

export default Wrapper;
