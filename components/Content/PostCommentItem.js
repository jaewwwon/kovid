import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { BREAK_POINT_TABLET } from "../Layout/CommonStyle";

const PostItem = ({ comment }) => {
  const { query } = useRouter();
  const allPostCategory = query?.category_id === undefined || query?.category_id === "1";
  return (
    <Post>
      <Link
        href={`/view/[id]?category_id=${query?.category_id || "1"}`}
        as={`/view/${comment.post_id}?category_id=${query?.category_id || "1"}`}
      >
        <a>
          <div className="write_info">
            <p className="nickname">{comment.comment_writer_nickname}</p>
            <p className="date">{comment.date}</p>
          </div>
          <p className="title">{comment.post_title}</p>
          <p className="comment">{comment.comment_content}</p>
          {/* <div className="utils">
            <p>{allPostCategory && comment.category_name} 카테고리</p>
            <span>댓글 {comment.comment_count}</span>
            <span>좋아요 {comment.liked}</span>
            <span>싫어요 {comment.disliked}</span>
          </div>
          {post?.thumbnail && (
            <img className="thumbnail" src={comment.thumbnail} alt="게시글 사진" />
          )} */}
        </a>
      </Link>
    </Post>
  );
};

const Post = styled.div`
  a {
    position: relative;
    display: block;
    padding: 20px 0;
    border-bottom: 1px solid #d6dadd;
    font-size: 14px;
    color: #7f858a;
    & > * + * {
      margin-top: 10px;
    }
  }
  .write_info {
    .nickname {
      color: #333;
    }
    .date {
      margin-top: 2px;
      font-size: 12px;
    }
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    max-height: 38px;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
  }
  .comment {
    position: relative;
    display: block;
    display: -webkit-box;
    max-height: 32px;
    padding-left: 20px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .comment:before {
    content: "└";
    position: absolute;
    left: 0;
    top: 0;
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .write_info {
      * {
        display: inline-block;
      }
      .date {
        margin: 1px 0 0 10px;
      }
    }
  }
`;

export default PostItem;
