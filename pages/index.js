import { useCallback, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Loader from "../components/Content/Loader";
import Pagination from "rc-pagination";
import { BREAK_POINT_TABLET } from "../components/Layout/CommonStyle";
import NoticeItem from "../components/Content/NoticeItem";
import PostItem from "../components/Content/PostItem";
import { useSelector, useDispatch } from "react-redux";
// import { END } from "redux-saga";
import { LOAD_NOTICE_REQUEST, LOAD_POST_REQUEST } from "../reducers/post";
// import wrapper from "../store/configureStore";

const Home = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { notice, posts, loadPostLoading } = useSelector((state) => state.post);
  const [page, setPage] = useState(query?.page || 1);

  useEffect(() => {
    dispatch({
      type: LOAD_NOTICE_REQUEST,
    });
    dispatch({
      type: LOAD_POST_REQUEST,
      data: {
        page: query?.page || 1,
        category_id: query?.category_id || 1,
        search_type: "content",
        search_word: query?.search_word || "",
      },
    });
    if (query?.page === "1") setPage(1);
  }, [query]);

  // 페이지 번호 변경
  const onChangePage = useCallback(
    (page) => {
      window.scrollTo(0, 0); // 스크롤 최상단으로 이동
      setPage(page);
      getRouterQuery(page);
    },
    [query],
  );

  const getRouterQuery = useCallback(
    (pageNumber) => {
      Router.push(
        `?page=${pageNumber}&category_id=${query.category_id || 1}${
          query?.search_word ? `&search_type=content&search_word=${query.search_word}` : ""
        }`,
      );
    },
    [query],
  );

  return (
    <Container>
      <div className="post_wrap">
        {loadPostLoading ? (
          <Loader />
        ) : (
          <>
            {/* 공지사항 */}
            <NoticeItem post={notice} />
            {/* 게시글 */}
            {posts.post_count > 0 ? (
              posts.posts?.map((post) => <PostItem key={post.post_id} post={post} />)
            ) : (
              <p className="none_content">현재 카테고리에 관련된 게시글이 없습니다.</p>
            )}
            {/* 페이지네이션 */}
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
            <Link href={`/write${query?.category_id ? `?category_id=${query?.category_id}` : ""}`}>
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
const Container = styled.div`
  .none_content {
    padding: 55px 0;
    font-size: 14px;
    color: #7f858a;
    text-align: center;
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
        top: -34px;
        right: 0;
        text-align: right;
      }
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .post_wrap {
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
