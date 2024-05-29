/* eslint-disable react/prop-types */
import { IoClose } from 'react-icons/io5';
import Wrapper from '../assets/wrappers/CustomModal';

const CustomModal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Wrapper>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>{title}</h2>
            <button onClick={onClose}>
              <IoClose />
            </button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CustomModal;
