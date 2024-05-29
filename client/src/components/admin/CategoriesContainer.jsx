import Wrapper from '../../assets/wrappers/admin/PostsContainer';
import PageBtnContainer from './PageBtnContainer';
import { useAllCategoriesContext } from '../../pages/admin/AllCategories';
import Category from './Category';
const CategoriesContainer = () => {
  const { data } = useAllCategoriesContext();

  const { categories, totalCategories, numOfPages } = data;
  if (categories.length === 0) {
    return (
      <Wrapper>
        <h2>Không có danh mục nào để hiển thị!</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Có tất cả {totalCategories} bài viết</h5>
      <div className="posts">
        {categories.map((category) => {
          return <Category key={category._id} {...category} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer type="category" />}
    </Wrapper>
  );
};
export default CategoriesContainer;
