import { useCallback, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BREAK_POINT_TABLET } from "../Layout/CommonStyle";

const PostCategorys = () => {
  const { query } = useRouter();
  const postCategory = useSelector((state) => state.post.postCategory);

  // 카테고리를 선택했을 경우
  const onClickCategory = useCallback(
    (categoryId) => {
      if (query.category_id !== categoryId) Router.push(`/?category_id=${categoryId}`);
    },
    [query],
  );

  return (
    <Nav className="filters">
      <h2>카테고리</h2>
      <ul>
        {postCategory?.map((category) => (
          <li
            key={category.idx}
            className={(query?.category_id || "1") === String(category.idx) ? "active" : undefined}
          >
            <button type="button" onClick={() => onClickCategory(String(category.idx))}>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  button {
    display: block;
    width: 100%;
    background-color: transparent;
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    border: 1px solid #ccc;
    h2 {
      padding: 16px 20px;
      background-color: #f5f5f6;
      font-size: 14px;
    }
    button {
      padding: 14px 20px;
      border-top: 1px solid #f5f5f6;
      font-size: 14px;
      color: #666;
      text-align: left;
    }
    .active {
      button {
        font-weight: 600;
        color: #333;
      }
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    margin: 0 -12px 20px;
    border-bottom: 1px solid #d6dadd;
    h2 {
      display: none;
    }
    ul {
      padding: 0 12px;
      white-space: nowrap;
      overflow-x: auto;
      li {
        display: inline-block;
        button {
          position: relative;
          margin-right: 24px;
          padding: 14px 0;
          border: 0;
          font-size: 14px;
        }
      }
      li.active {
        button {
          font-weight: 700;
        }
        button:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #f6c52f;
        }
      }
    }
  }
`;

export default PostCategorys;
