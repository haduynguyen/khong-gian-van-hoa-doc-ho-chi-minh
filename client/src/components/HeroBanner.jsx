import bannerImg from '../assets/images/banner.png';
import Wrapper from '../assets/wrappers/HeroBanner';

const HeroBanner = () => {
  return (
    <Wrapper>
      <div className="banner-container">
        <div className="banner">
          <img src={bannerImg} alt="banner" className="banner-img" />
        </div>
      </div>
    </Wrapper>
  );
};
export default HeroBanner;
