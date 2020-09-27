import { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Loader from "../../components/Content/Loader";
import DefaultErrorPage from "next/error";
import { BREAK_POINT_TABLET } from "../../components/Layout/CommonStyle";
import LikedSection from "../../containers/Post/LikedSection";
import CommentSection from "../../containers/Post/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import {
  LOAD_POST_DETAIL_REQUEST,
  LOAD_COMMENT_REQUEST,
  WRITE_COMMENT_REQUEST,
  DELETE_POST_REQUEST,
} from "../../reducers/post";
import wrapper from "../../store/configureStore";

const View = () => {
  const { query, asPath } = useRouter();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const { postInfo, comments, loadPostLoading, loadPostDetailError, commentSuccess } = useSelector(
    (state) => state.post,
  );
  const [content, setContent] = useState("");

  useEffect(() => {
    if (query?.id) {
      // 게시글 상세 정보 불러오기
      dispatch({
        type: LOAD_POST_DETAIL_REQUEST,
        data: {
          id: query.id,
        },
      });
      // 댓글 불러오기
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: {
          post_id: query.id,
          page: 1,
        },
      });
    }
  }, [query]);

  useEffect(() => {
    // 댓글 입력 성공했을 경우, 전체 댓글 불러오기
    if (commentSuccess) {
      dispatch({
        type: LOAD_COMMENT_REQUEST,
        data: {
          post_id: query.id,
          page: 1,
        },
      });
      // 입력란 초기화
      setContent("");
    }
  }, [query, commentSuccess]);

  // 댓글 입력폼
  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  // 댓글 작성
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!profile) alert("로그인 후 이용할 수 있습니다.");
      if (content.length === 0) alert("댓글 내용을 입력하세요.");
      dispatch({
        type: WRITE_COMMENT_REQUEST,
        data: {
          post_id: postInfo.post_id,
          content,
        },
      });
    },
    [profile, postInfo, content],
  );

  // 게시글 삭제
  const onDeletePost = useCallback(() => {
    if (confirm("해당 게시글을 삭제하시겠습니까?")) {
      dispatch({
        type: DELETE_POST_REQUEST,
        data: {
          post_id: postInfo.post_id,
        },
      });
    }
  }, [postInfo]);

  // 유효하지 않은 게시글일 경우, 404 페이지 리턴
  if (loadPostDetailError === "not_found_post") return <DefaultErrorPage statusCode={404} />;

  if (loadPostLoading) return <Loader />;

  return (
    <>
      <Head>
        <title>{postInfo?.title} | Kovid</title>
        <meta name="description" content={postInfo?.content.slice(0, 10)} />
        <meta property="og:title" content={`${postInfo?.title} | Kovid}`} />
        <meta property="og:description" content={postInfo?.content.slice(0, 10)} />
        <meta property="og:url" content={`https://ko.kovid19.co.kr/${asPath.slice(1)}`} />
      </Head>
      <Container>
        <div className="board_content">
          <h2 className="board_title">{postInfo?.title}</h2>
          <div className="write_info">
            <span>
              <b>{postInfo?.nickname}</b>
            </span>
            <span>{postInfo?.date}</span>
          </div>
          <pre className="board_desc">{postInfo?.content}</pre>
          {postInfo?.attachs?.map((data) => (
            <p key={data.id} className="board_img">
              <img src={data.url} alt="첨부사진" />
            </p>
          ))}
          {/* 게시글 평가 영역 */}
          {postInfo && <LikedSection postInfo={postInfo} />}
          {profile?.user.idx === postInfo?.user_id && (
            <div className="board_utils">
              <Link href={`/update/[id]`} as={`/update/${postInfo?.post_id}`}>
                <a>글수정</a>
              </Link>
              <button type="button" onClick={onDeletePost}>
                글삭제
              </button>
            </div>
          )}
        </div>
        <div className="board_comment">
          <p className="comment_count">댓글 {comments?.length}</p>
          <form onSubmit={onSubmitForm}>
            <textarea
              value={content}
              onChange={onChangeContent}
              placeholder={
                profile
                  ? "댓글 작성시 타인에 대한 배려와 책임을 담아주세요."
                  : "로그인 후 이용하실 수 있습니다."
              }
              disabled={!profile}
              required
            />
            <button type="submit" disabled={!profile}>
              등록
            </button>
          </form>
          <ol className="comment_list">
            {comments?.map((comment) => (
              <li key={comment.comment_id}>
                <CommentSection post_id={query.id} comment={comment} />
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .board_content {
    position: relative;
    padding: 45px 40px 25px 40px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    .board_title {
      font-size: 24px;
      font-weight: 700;
    }
    .write_info {
      margin-top: 10px;
      span {
        position: relative;

        color: #727579;
      }
      span + span {
        margin-left: 10px;
      }
    }
    .board_desc {
      min-height: 155px;
      margin-top: 15px;
      line-height: 1.45;
    }
    .board_img {
      margin-top: 5px;
    }
    .board_utils {
      position: absolute;
      right: 35px;
      top: 17px;
      & > * {
        display: inline-block;
        background-color: #fff;
        border: 0;
        line-height: 24px;
      }
      & > * + * {
        margin-left: 15px;
      }
    }
  }
  .board_comment {
    margin-top: 20px;
    padding: 40px;
    border-radius: 4px;
    background-color: #f1f2f4;
    font-size: 14px;
    color: #727579;
    form {
      position: relative;
      margin-top: 10px;
      textarea {
        width: 100%;
        height: 80px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
      }
      button {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 5px 20px;
        background-color: #fff;
        border: 1px solid #727579;
        border-radius: 20px;
        font-weight: 500;
        font-size: 12px;
      }
    }
    .comment_list {
      margin-top: 20px;
      li + li {
        margin-top: 20px;
      }
      .write_info {
        font-size: 12px;
        span + span {
          margin-left: 10px;
        }
      }
      .comment {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.43;
        word-break: keep-all;
        white-space: pre-wrap;
      }
      .comment_btns {
        margin-top: 10px;
        button {
          background-color: transparent;
          border: 0;
          font-size: 12px;
          color: #727579;
        }
        button + button {
          margin-left: 10px;
        }
      }
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .board_content {
      margin: 0 -20px;
      padding: 0 20px;
      border: 0;
      .board_utils {
        top: -28px;
      }
    }
    .board_comment {
      margin: 20px -20px 0;
      padding: 25px 20px;
    }
  }
`;

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//   context.store.dispatch({
//     type: LOAD_POST_DETAIL_REQUEST,
//     data: {
//       id: context.query.id,
//     },
//   });
//   context.store.dispatch({
//     type: LOAD_COMMENT_REQUEST,
//     data: {
//       post_id: context.query.id,
//       page: 1,
//     },
//   });
//   context.store.dispatch(END);
//   await context.store.sagaTask.toPromise();
// });

export default View;
