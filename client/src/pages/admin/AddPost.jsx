/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/AdminFormPage';
import { FormRow, FormRowSelect } from '../../components';
import { POST_STATUS, TITLE_OF_POST_STATUS } from '../../../../utils/constants';
import { CustomEditor } from '../../components/admin';
import customFetch from '../../utils/customFetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const loader = async () => {
  try {
    const { data } = await customFetch.get('/categories');
    return { categories: data };
  } catch (error) {
    return redirect('/');
  }
};

const AddPost = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const [editorContent, setEditorContent] = useState('');
  const { categories } = useLoaderData();
  const queryClient = useQueryClient();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', event.target.title.value);
    formData.append('status', event.target.status.value);
    formData.append('content', editorContent);
    formData.append('category', event.target.category.value);

    const data = Object.fromEntries(formData);

    if (!formData.get('content')) {
      return;
    }

    try {
      await customFetch.post('/posts', data);
      await queryClient.invalidateQueries(['posts']);
      toast.success('Bài viết đã được tạo thành công');

      return navigate('/admin/posts');
    } catch (error) {
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">Tạo mới bài viết</h4>
        <div className="form-center">
          <FormRowSelect
            name="category"
            labelText="Phân loại"
            list={categories}
            isEnumList={false}
          />
          <FormRow
            type="text"
            name="title"
            labelText="Tiêu đề"
            placeholder="Nhập tiêu đề bài viết vào đây..."
          />
          <CustomEditor
            name="content"
            labelText="Nội dung"
            setEditorContent={setEditorContent}
          />
          <FormRowSelect
            name="status"
            labelText="Trạng thái"
            list={Object.values(POST_STATUS)}
            titleList={TITLE_OF_POST_STATUS}
            defaultValue={POST_STATUS.DRAFT}
            isEnumList={true}
          />
          <div className="form-btn-container">
            <button
              type="button"
              className="btn btn-block form-btn btn-cancel"
              onClick={() => navigate('/admin/posts')}
            >
              Huỷ
            </button>
            <button
              className="btn btn-block form-btn"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Đang lưu bài' : 'Lưu bài'}
            </button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};
export default AddPost;
