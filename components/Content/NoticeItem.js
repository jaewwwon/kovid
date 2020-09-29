import Link from "next/link";
import styled from "styled-components";
import { BREAK_POINT_TABLET } from "../Layout/CommonStyle";

const NoticeItem = ({ post }) => {
  return (
    <Post>
      <Link href="/notice">
        <a>
          <div className="write_info">
            <p className="nickname">{post.nickname}</p>
            <p className="date">{post.date}</p>
          </div>
          <p className="title">{post.title}</p>
          <p className="content">{post.content}</p>
        </a>
      </Link>
    </Post>
  );
};

const Post = styled.div`
  border-bottom: 3px solid #ddd;
  a {
    position: relative;
    display: block;
    padding: 20px 150px 20px 0;
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
  .content {
    max-height: 32px;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .utils {
    font-size: 12px;
    span + span {
      position: relative;
      margin-left: 10px;
      padding-left: 10px;
    }
    span + span:after {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      width: 3px;
      height: 3px;
      background-color: #c9c9c9;
      border-radius: 50%;
    }
  }
  .thumbnail {
    position: absolute;
    right: 0;
    top: 50%;
    width: 135px;
    height: 135px;
    margin-top: 0;
    transform: translateY(-50%);
    border: 1px solid #d6dadd;
    object-fit: cover;
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    a {
      padding-right: 100px;
    }
    .write_info {
      * {
        display: inline-block;
      }
      .date {
        margin: 1px 0 0 10px;
      }
    }
    .content {
      display: none;
    }
    .thumbnail {
      width: 85px;
      height: 85px;
      border-radius: 4px;
    }
  }
`;

export default NoticeItem;
