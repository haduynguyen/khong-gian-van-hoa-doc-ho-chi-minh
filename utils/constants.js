export const POST_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const TITLE_OF_POST_STATUS = {
  [POST_STATUS.DRAFT]: "Bản nháp",
  [POST_STATUS.PUBLISHED]: "Đăng",
};

export const POST_SORT_BY = {
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
  ASCENDING: "a-z",
  DESCENDING: "z-a",
};

export const TITLE_OF_POST_SORT_BY = {
  [POST_SORT_BY.NEWEST_FIRST]: "Mới nhất",
  [POST_SORT_BY.OLDEST_FIRST]: "Cũ nhất",
  [POST_SORT_BY.ASCENDING]: "Từ A đến Z",
  [POST_SORT_BY.DESCENDING]: "Từ Z đến A",
};
