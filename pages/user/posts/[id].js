import { useCallback, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Loader from "../../../components/Content/Loader";
import Pagination from "rc-pagination";
import { BREAK_POINT_TABLET } from "../../../components/Layout/CommonStyle";
import PostItem from "../../../components/Content/PostItem";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_USER_POST_REQUEST } from "../../../reducers/post";

const UserPosts = () => {
  const { query, pathname } = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { posts, loadPostLoading } = useSelector((state) => state.post);
  const [page, setPage] = useState(query?.page || 1);

  useEffect(() => {
    if (query?.id)
      dispatch({
        type: LOAD_USER_POST_REQUEST,
        data: {
          page: query?.page || 1,
          category_id: query?.category_id || 1,
          user_idx: query.id,
        },
      });
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
      <Tab>
        <ul>
          <li className={pathname.includes("/user/posts") ? "active" : undefined}>
            <Link href="/user/posts/[id]" as={`/user/posts/${query.id}`}>
              <a> 작성한 글</a>
            </Link>
          </li>
          <li className={pathname.includes("/user/comments") ? "active" : undefined}>
            <Link href="/user/comments/[id]" as={`/user/comments/${query.id}`}>
              <a> 댓글 단 글</a>
            </Link>
          </li>
        </ul>
      </Tab>
      {loadPostLoading ? (
        <Loader />
      ) : (
        <>
          {/* 게시글 */}
          {posts.count > 0 ? (
            posts.posts?.map((post) => <PostItem key={post.post_id} post={post} />)
          ) : (
            <p className="none_content">작성한 게시글이 없습니다.</p>
          )}
          {/* 페이지네이션 */}
          {posts.count >= 10 && (
            <PaginationWrap
              current={page}
              onChange={onChangePage}
              total={posts.count}
              pageSize={10}
              showTitle={false}
              showLessItems
            />
          )}
        </>
      )}
    </Container>
  );
};

const Tab = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    flex: 0 0 50%;
    border-bottom: 1px solid #ccc;
    a {
      display: block;
      width: 100%;
      padding: 14px 0;
      font-size: 14px;
      color: #7f858a;
      text-align: center;
    }
  }
  .active {
    border-bottom: 3px solid #f6c52f;
    a {
      font-weight: 500;
      color: #333;
    }
  }
`;
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
`;

export default UserPosts;
