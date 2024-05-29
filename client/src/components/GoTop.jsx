/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/GoTop';

const GoTop = () => {
  const [showGoTop, setShowGoTop] = useState(false);

  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 100);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);
  }, []);

  return (
    <Wrapper>
      <button
        type="button"
        className={showGoTop ? 'go-top' : 'go-top-hidden'}
        onClick={handleScrollUp}
      >
        <FaChevronUp className="go-top-icon" />
      </button>
    </Wrapper>
  );
};
export default GoTop;
