import { useCallback, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Loader from "../components/Content/Loader";
import Pagination from "rc-pagination";
import { BREAK_POINT_TABLET } from "../components/Layout/CommonStyle";
import PostItem from "../components/Content/PostItem";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
// import { END } from "redux-saga";
import { LOAD_POST_REQUEST, LOAD_CATEGORY_REQUEST } from "../reducers/post";
// import wrapper from "../store/configureStore";

const Home = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { posts, postCategory, loadPostLoading } = useSelector((state) => state.post);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(query?.page || 1);
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: {
        page: query?.page || 1,
        category_id: query?.category_id || 1,
        search_type: "content",
        search_word: query?.search_word || "",
      },
    });
    query?.search_word ? setKeyword(query.search_word) : setKeyword("");
  }, [query]);

  useEffect(() => {
    // 게시글 카테고리 불러오기
    if (!postCategory) dispatch({ type: LOAD_CATEGORY_REQUEST });
  }, [postCategory]);

  // 카테고리를 선택했을 경우
  const onClickCategory = useCallback(
    (categoryId) => {
      if (query.category_id !== categoryId) Router.push(`?category_id=${categoryId}`);
    },
    [query],
  );

  // 검색어 입력값
  const onChangeKeyword = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  // 페이지 번호 변경
  const onChangePage = useCallback(
    (page) => {
      window.scrollTo(0, 0); // 스크롤 최상단으로 이동
      setPage(page);
      getRouterQuery(page);
    },
    [query, keyword],
  );

  //  검색어 입력값
  const onSubmitSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (query?.search_word === keyword || (!query?.search_word && keyword.length === 0)) return;
      setPage(1);
      getRouterQuery(1);
    },
    [keyword, query],
  );

  const getRouterQuery = useCallback(
    (pageNumber) => {
      Router.push(
        `?page=${pageNumber}&category_id=${query.category_id || 1}${
          keyword ? `&search_type=content&search_word=${keyword}` : ""
        }`,
      );
    },
    [query, keyword],
  );

  return (
    <Container>
      <SearchForm className="search_form" positionTop={profile ? 108 : 152}>
        <form onSubmit={onSubmitSearch}>
          <input
            type="text"
            value={keyword}
            onChange={onChangeKeyword}
            placeholder="검색어를 입력하세요."
          />
          <button type="submit">검색</button>
        </form>
      </SearchForm>
      <nav className="filters">
        <ul>
          {postCategory?.map((category) => (
            <li
              key={category.idx}
              className={
                (query?.category_id || "1") === String(category.idx) ? "active" : undefined
              }
            >
              <button type="button" onClick={() => onClickCategory(String(category.idx))}>
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="post_wrap">
        {loadPostLoading ? (
          <Loader />
        ) : (
          <>
            {posts.post_count > 0 ? (
              posts.posts?.map((post) => <PostItem key={post.post_id} post={post} />)
            ) : (
              <p className="none_content">현재 카테고리에 관련된 게시글이 없습니다.</p>
            )}
            {posts.post_count >= 10 && (
              <PaginationWrap
                current={page}
                onChange={onChangePage}
                total={posts.post_count}
                pageSize={10}
                showTitle={false}
                showLessItems
              />
            )}
          </>
        )}
        {/* 비로그인 상태에서 버튼 숨김 */}
        {profile && (
          <div className="button_wrap">
            <Link href="/write">
              <a className="btn">글작성</a>
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

const PaginationWrap = styled(Pagination)`
  margin-top: 24px;
  text-align: center;
  li {
    display: inline-block;
    &:focus {
      outline: 0;
    }
    &:hover {
      button,
      a {
        background-color: #f2f2f2;
      }
    }
    button,
    a {
      display: block;
      width: 32px;
      height: 32px;
      margin: 0 3px;
      line-height: 30px;
      border-radius: 50%;
      font-size: 12px;
      text-align: center;
    }
  }
  li.rc-pagination-item-active {
    a {
      background-color: #767676;
      color: #fff;
    }
  }
  li.rc-pagination-prev {
    button:after {
      content: "＜";
    }
  }
  li.rc-pagination-next {
    button:after {
      content: "＞";
    }
  }
  li.rc-pagination-jump-prev,
  li.rc-pagination-jump-next {
    button:after {
      content: "…";
    }
  }
`;
const SearchForm = styled.div`
  margin: 0 0 0 auto;
  form {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    input[type="text"] {
      width: 75%;
      height: 38px;
      padding: 0 8px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px 0 0 4px;
    }
    button {
      width: 25%;
      background-color: #333;
      border-radius: 0 4px 4px 0;
      color: #fff;
    }
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    position: absolute;
    left: 0;
    top: ${(props) => `${props.positionTop}px`};
    width: 280px;
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    max-width: 240px;
    margin-bottom: 10px;
  }
`;
const Container = styled.div`
  .none_content {
    padding: 55px 0;
    font-size: 14px;
    color: #7f858a;
    text-align: center;
  }
  .filters {
    padding: 0 12px;
    border-bottom: 1px solid #d6dadd;
    ul {
      white-space: nowrap;
      overflow-x: auto;
      li {
        display: inline-block;
        button {
          position: relative;
          display: block;
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
  .post_wrap {
    position: relative;
    .button_wrap {
      .btn {
        display: inline-block;
        width: 98px;
        height: 38px;
        line-height: 36px;
        border: 0;
        border-radius: 4px;
        background-color: #0f1215;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        color: #fff;
      }
    }
  }
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    .post_wrap {
      .button_wrap {
        position: absolute;
        top: -42px;
        right: 0;
        text-align: right;
      }
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .filters {
      margin: 0 -12px;
      padding: 0;
      ul {
        padding: 0 12px;
      }
    }
    .post_wrap {
      /* margin: 0 -20px; */
      .button_wrap {
        text-align: center;
        margin-top: 24px;
      }
    }
  }
`;

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   context.store.dispatch({
//     type: LOAD_POST_REQUEST,
//     data: {
//       page: context.query?.page || 1,
//       category_id: context.query?.category_id || 1,
//     },
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export default Home;