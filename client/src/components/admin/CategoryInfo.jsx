/* eslint-disable react/prop-types */
import Wrapper from '../../assets/wrappers/admin/PostInfo';

const CategoryInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="post-icon">{icon}</span>
      <span className="post-text">{text}</span>
    </Wrapper>
  );
};
export default CategoryInfo;
