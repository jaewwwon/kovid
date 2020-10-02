import { useCallback, useState, useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
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
        <div className="btn_wrap">
          <button type="button" onClick={() => Router.back()}>
            목록으로
          </button>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .btn_wrap {
    margin-top: 35px;
    text-align: center;
    button {
      padding: 4px 10px;
      background-color: #f1f2f4;
      font-size: 14px;
    }
  }
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
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .board_content {
      padding: 0;
      border: 0;
    }
  }
`;

export default Notice;
