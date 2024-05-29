import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';

const adminLinks = [
  {
    text: 'Thêm bài viết',
    path: '',
    icon: <FaWpforms />,
  },
  {
    text: 'Quản lý bài viết',
    path: 'posts',
    icon: <MdQueryStats />,
  },
  {
    text: 'Thêm danh mục',
    path: 'add-category',
    icon: <FaWpforms />,
  },
  {
    text: 'Quản lý danh mục',
    path: 'categories',
    icon: <MdQueryStats />,
  },
];

const categoryLinks = [
  {
    text: 'Quê hương và gia đình',
    path: 'que-huong-va-gia-dinh',
  },
  {
    text: 'Tiểu sử và sự nghiệp',
    path: 'tieu-su-va-su-nghiep',
  },
  {
    text: 'Việc đọc và tự học của bác',
    path: 'viec-doc-va-tu-hoc-cua-bac',
  },
  {
    text: 'Bác Hồ với Bình Định',
    path: 'bac-ho-voi-binh-dinh',
  },
  {
    text: 'Nhân dân Bình Định với Bác Hồ',
    path: 'nhan-dan-binh-dinh-voi-bac-ho',
  },
  {
    text: 'Trường THPT số 1 Phú Mỹ làm theo lời Bác',
    path: 'truong-thpt-so-1-phu-my-lam-theo-loi-bac',
  },
  {
    text: 'Không gian mở bật lên giá trị Hồ Chí Minh',
    path: 'khong-gian-mo-bat-len-gia-tri-ho-chi-min',
  },
];

export { adminLinks, categoryLinks };
