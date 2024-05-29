import { Form, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/AdminFormPage';
import { FormRow, FormRowSelect, FormRowTextarea } from '../../components';
import { POST_STATUS, TITLE_OF_POST_STATUS } from '../../../../utils/constants';
import { CustomEditor } from '../../components/admin';
import customFetch from '../../utils/customFetch';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const AddCategories = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === 'submitting';
  const [editorContent, setEditorContent] = useState('');
  const [editorIntro, setEditorIntro] = useState('');
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [introImage, setIntroImage] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const IntroImage = new FormData();
    IntroImage.append('file', introImage);
    IntroImage.append('upload_preset', 'ml_default');
    const res = await fetch('image-upload-api-url', {
      method: 'POST',
      body: IntroImage,
    });
    const image = await res.json();

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
      await customFetch.post('/categories', data);
      await queryClient.invalidateQueries(['categories']);
      toast.success('Danh mục đã được tạo thành công');

      return navigate('/admin/categories');
    } catch (error) {
      return error;
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">Tạo mới danh mục </h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="Tên danh mục"
            placeholder="Nhập tên danh mục vào đây..."
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
              required
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
            onChange={(e) => setEditorIntro(e.target.value)}
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
export default AddCategories;
