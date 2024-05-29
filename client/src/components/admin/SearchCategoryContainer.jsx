import { FormRow, FormRowSelect } from '../index';
import Wrapper from '../../assets/wrappers/admin/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import {
  TITLE_OF_POST_STATUS,
  TITLE_OF_POST_SORT_BY,
  POST_STATUS,
  POST_SORT_BY,
} from '../../../../utils/constants';

import { useAllCategoriesContext } from '../../pages/admin/AllCategories';

const SearchContainer = () => {
  const { searchValues, categories } = useAllCategoriesContext();
  const { search, status, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;

    return (e) => {
      const form = e.currentTarget.form;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };
  return (
    <Wrapper>
      <Form className="form">
        {/* <h5 className="form-title">search form</h5> */}
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            labelText={'Tìm kiếm'}
            defaultValue={search}
            placeholder="Tìm kiếm bài viết..."
            required={false}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            name="status"
            labelText="Trạng thái"
            list={['all', ...Object.values(POST_STATUS)]}
            titleList={{ all: 'Tất cả', ...TITLE_OF_POST_STATUS }}
            defaultValue={'Tất cả'}
            isEnumList={true}
            required={false}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            name="sort"
            labelText="Sắp xếp"
            list={['all', ...Object.values(POST_SORT_BY)]}
            titleList={{ all: 'Tất cả', ...TITLE_OF_POST_SORT_BY }}
            defaultValue={'Tất cả'}
            isEnumList={true}
            required={false}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/admin/categories" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
