/* eslint-disable react/no-unescaped-entities */
import Wrapper from '../assets/wrappers/LandingPage';
import { useHomeLayoutContext } from './HomeLayout';

const Landing = () => {
  const homeLayoutContext = useHomeLayoutContext();

  if (!homeLayoutContext) {
    // Handle the case where homeLayoutContext is undefined
    return null; // Or return a loading spinner, or throw an error, etc.
  }
  const { categoriesList } = homeLayoutContext;

  return (
    <Wrapper>
      <section className="introduce-section">
        <p className="text-center font-semibold italic">
          Chào mừng các bạn đến với "Không gian văn hoá đọc Hồ Chí Minh: Bác Hồ
          với Bình Định, Bình Định với Bác Hồ" - nơi giúp bạn tìm được những
          thông tin bổ ích liên quan đến cuộc đời, thân thế và sự nghiệp của chủ
          tịch Hồ Chí Minh, tư tưởng của Bác Hồ với việc đọc và tự học, tình cảm
          của Bác Hồ đối với nhân dân Bình Định và tình cảm của nhân dân Bình
          Định với Bác Hồ. Tại trang web này, các bạn sẽ có được những phút giây
          trân quý khi ở "bên Bác lòng ta trong sáng hơn".
        </p>
        <img
          className="block mx-auto"
          src="https://res.cloudinary.com/djnmieevk/image/upload/v1715491879/w1roi7ja1yqz6odk2kuu.png"
        />
        <p className="text-justify">
          Cũng như Nghệ An, thành phố Huế, Phan Thiết (Bình Thuận)... những ngày
          tháng Nguyễn Tất Thành ở Bình Định không nhiều nhưng là một sự kiện
          quan trọng trong buổi thiếu thời của Chủ tịch Hồ Chí Minh. Người đã
          đến nhiều nơi gặp nhiều người trên vùng "đất võ trời văn" lắng đọng
          nhiều tinh hoa văn hoá, vang dội những chiến công của phong trào khởi
          nghĩa Tây Sơn và Anh hùng Quang Trung - Nguyễn Huệ. Người đã chứng
          kiến những ngày đen tối ở Bình Định sau khi nhà Tây Sơn sụp đổ cùng cả
          nước trong cảnh mất nước, nhân dân sống trong nô lệ lầm than, chứng
          kiến tinh thần quật cường, quả cảm của những con người giàu lòng yêu
          nước. Cũng trên mảnh đất Bình Định đau thương và kiên trung này, không
          những ba cha con cụ Phó bảng Nguyễn Sinh Huy sống chung với nhau những
          ngày sum họp cuối cùng sau khi ở Nghệ An và Huế, mà còn là nơi diễn ra
          cảnh chia tay đầu tiên, đồng thời là giờ phút ly biệt lịch sử. Từ đó
          Nguyễn Tất Thành bước vào cuộc hành trình vạn dặm đầy gian khổ tìm
          đường cứu nước, cứu dân... Mục đích của việc nghiên cứu dự án:
          <span className="text-primary">
            &nbsp;"Xây dựng không gian văn hoá đọc Hồ Chí Minh: Bác Hồ với Bình
            Định, Bình Định với Bác Hồ"&nbsp;
          </span>
          nhằm giúp cho các bạn học sinh Trường THPT số 1 Phù Mỹ biết yêu sách,
          trân trọng sách, hứng thú và yêu thích việc đọc sách nhằm lan toả và
          phát triển văn hoá đọc trong nhà trường. Và quan trọng hơn nhằm giáo
          dục lòng yêu quý, tự hào và biết ơn với Bác Hồ kính yêu, trân trọng
          những tình cảm thiêng liêng của Bác Hồ dành cho nhân dân Bình Định và
          nhân dân Bình Định với Bác Hồ, biến việc học tập và làm theo Bác trở
          thành một việc làm thường xuyên, thiết thực gắn với việc học tập và
          rèn luyện của học sinh nhà trường.
        </p>
      </section>
      <section className="category-list-section">
        <h4 className="text-center font-bold">Danh mục bài viết</h4>
        <div className="category-list">
          {categoriesList?.map((category, index) => (
            <div className="category-item" key={index}>
              <img className="category-img" src={category.intro_image} />
              <div className="category-content">
                <div className="category-title">
                  {index + 1}. {category.name}
                </div>
                <div className="category-description">{category.intro}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Wrapper>
  );
};
export default Landing;
