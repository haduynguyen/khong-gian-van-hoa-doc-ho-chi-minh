/* eslint-disable react/prop-types */
import { FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/admin/Post';
import PostInfo from './PostInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import { TITLE_OF_POST_STATUS } from '../../../../utils/constants';
import { useState } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { RiErrorWarningFill } from 'react-icons/ri';

const Post = ({ _id, category, title, createdAt, status }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{title}</h5>
          <p>{category?.name}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <PostInfo icon={<FaCalendarAlt />} text={date} />
          <div className={`status ${status}`}>
            {TITLE_OF_POST_STATUS[status]}
          </div>
        </div>
        <footer className="actions">
          <Link to={`../edit-post/${_id}`} className="btn edit-btn">
            Sửa
          </Link>
          <Popover
            isOpen={isPopoverOpen}
            positions={['top', 'bottom', 'left', 'right']}
            containerClassName="popover-container"
            onClickOutside={() => setIsPopoverOpen(false)}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'var(--white)'}
                arrowSize={10}
                arrowStyle={{ opacity: 0.7 }}
                className="popover-arrow-container"
                arrowClassName="popover-arrow"
              >
                <div className="popover-content">
                  <div className="text-container flex items-center justify-center">
                    <RiErrorWarningFill />
                    <span>Bạn chắc chắn muốn xoá bài viết này?</span>
                  </div>
                  <div className="btn-container flex items-center justify-center">
                    <button
                      className="btn btn-cancel"
                      onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    >
                      Huỷ thao tác
                    </button>
                    <Form method="post" action={`../delete-post/${_id}`}>
                      <button type="submit" className="btn btn-submit">
                        Tiếp tục
                      </button>
                    </Form>
                  </div>
                </div>
              </ArrowContainer>
            )}
          >
            <button
              className="btn delete-btn"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              Xoá
            </button>
          </Popover>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Post;
