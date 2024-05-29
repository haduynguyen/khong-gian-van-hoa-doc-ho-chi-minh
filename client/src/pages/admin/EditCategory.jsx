/* eslint-disable react-refresh/only-export-components */
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/AdminFormPage';
import { FormRow, FormRowSelect, FormRowTextarea } from '../../components';
import { POST_STATUS, TITLE_OF_POST_STATUS } from '../../../../utils/constants';
import { CustomEditor } from '../../components/admin';
import customFetch from '../../utils/customFetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const singleCategoryQuery = (id) => {
  return {
    queryKey: ['category', id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/categories/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleCategoryQuery(params.categoryId));
      return params.categoryId;
    } catch (error) {
      return redirect('/admin/categories');
    }
  };

const EditCategory = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  const categoryId = useLoaderData();

  const {
    data: { category },
  } = useQuery(singleCategoryQuery(categoryId));

  const [introImage, setIntroImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(category.intro_image);
  const [editorContent, setEditorContent] = useState(category.content);
  const [editorIntro, setEditorIntro] = useState(category.intro);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIntroImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const queryClient = useQueryClient();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let image = { url: category.intro_image };

    if (introImage) {
      const IntroImage = new FormData();
      IntroImage.append('file', introImage);
      IntroImage.append('upload_preset', 'ml_default');
      const res = await fetch('image-upload-api-url', {
        method: 'POST',
        body: IntroImage,
      });
      image = await res.json();
    }

    const formData = new FormData();

    formData.append('name', event.target.name.value);
    formData.append('status', event.target.status.value);
    formData.append('intro_image', image.url);
    formData.append('content', editorContent);
    formData.append('intro', editorIntro);

    const data = Object.fromEntries(formData);

    if (!formData.get('content')) {
      return;
    }

    if (!formData.get('intro')) {
      return;
    }

    try {
      await customFetch.put(`/categories/${categoryId}`, data);
      await queryClient.invalidateQueries(['posts']);
      toast.success('Danh mục đã được chỉnh sửa thành công');

      return navigate('/admin/categories');
    } catch (error) {
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">Chỉnh sửa bài viết</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Tên danh mục"
            defaultValue={category.name}
          />

          <div className="form-row">
            <label htmlFor="introImage" className="form-label">
              Chọn ảnh giới thiệu cho danh mục (tối đa 0.5 MB)
            </label>
            <input
              type="file"
              id="introImage"
              name="introImage"
              className="form-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: '60px', height: '60px' }}
            />
          )}
          <FormRowTextarea
            name="intro"
            labelText="Giới thiệu"
            defaultValue={category.intro}
            onChange={(e) => setEditorIntro(e.target.value)}
          />
          <CustomEditor
            name="content"
            labelText="Nội dung"
            setEditorContent={setEditorContent}
            defaultValue={category.content}
          />
          <FormRowSelect
            name="status"
            labelText="Trạng thái"
            list={Object.values(POST_STATUS)}
            titleList={TITLE_OF_POST_STATUS}
            defaultValue={category.status}
            isEnumList={true}
          />
          <div className="form-btn-container">
            <button
              type="button"
              className="btn btn-block form-btn btn-cancel"
              onClick={() => navigate('/admin/categories')}
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
export default EditCategory;
