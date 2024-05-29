import styled from 'styled-components';

const Wrapper = styled.div`
  .modal-overlay {
    padding: 24px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .modal {
    background-color: white;
    padding: 24px;
    border-radius: var(--border-radius);
    width: 100%;
    max-width: 550px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    color: #67758d;
  }

  .modal-header button {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .modal-content {
    padding: 50px 0;
    text-align: center;
  }
`;

export default Wrapper;
