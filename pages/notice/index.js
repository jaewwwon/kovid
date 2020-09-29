import { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styled from "styled-components";
import { BREAK_POINT_TABLET } from "../../components/Layout/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_NOTICE_REQUEST } from "../../reducers/post";

const Notice = () => {
  const dispatch = useDispatch();
  const { asPath } = useRouter();
  const notice = useSelector((state) => state.post.notice);

  useEffect(() => {
    dispatch({
      type: LOAD_NOTICE_REQUEST,
    });
  }, []);

  return (
    <>
      <Head>
        <title>{notice?.title} | 코비드바이</title>
        <meta name="description" content={notice?.content?.slice(0, 10)} />
        <meta property="og:title" content={`${notice?.title} | 코비드바이}`} />
        <meta property="og:description" content={notice?.content?.slice(0, 10)} />
        <meta property="og:url" content={`https://covid19bye.com/${asPath.slice(1)}`} />
      </Head>
      <Container>
        <div className="board_content">
          <h2 className="board_title">{notice?.title}</h2>
          <div className="write_info">
            <span>
              <b>{notice?.nickname}</b>
            </span>
            <span>{notice?.date}</span>
          </div>
          <pre className="board_desc">{notice?.content}</pre>
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

export default Notice;
