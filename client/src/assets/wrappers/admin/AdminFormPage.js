import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-3);

  .form-title {
    margin-bottom: 2rem;
    font-size: 24px;
    font-weight: 500;
    color: var(--primary-500);
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form-label {
    font-weight: 500;
  }
  .form-btn-container {
    display: flex;
    gap: 2rem;
  }
  .form-btn {
    flex: 1;
    margin-top: 1rem;
  }
`;

export default Wrapper;
