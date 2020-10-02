import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { PageInner, BREAK_POINT_TABLET } from "../../components/Layout/CommonStyle";
import PostSearchForm from "../../components/Content/PostSearchForm";
import PostCategorys from "../../components/Content/PostCategorys";
import CustomPopup from "../../components/Popup/CustomPopup";
import LoginForm from "../../components/Content/LoginForm";
import Signin from "../Auth/Signin";
import Signup from "../Auth/Signup";
import FindPassword from "../Auth/FindPassword";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFO, LOG_OUT_REQUEST } from "../../reducers/user";
import { LOAD_CATEGORY_REQUEST } from "../../reducers/post";

const AppContainer = ({ children }) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const { profile } = useSelector((state) => state.user);
  const postCategory = useSelector((state) => state.post.postCategory);

  const [onSigninPopup, setOnSigninPopup] = useState(false); // 로그인 팝업 활성화 상태
  const [onSignupPopup, setOnSignupPopup] = useState(false); // 회원가입 팝업 활성화 상태
  const [onFindPasswordPopup, setOnFindPasswordPopup] = useState(false); // 비밀번호 찾기 팝업 활성화 상태

  useEffect(() => {
    // get User 필요함, 우선 session에 사용자 정보 저장해서 사용
    if (Boolean(JSON.parse(sessionStorage.getItem("authToken")))) {
      dispatch({
        type: LOAD_USER_INFO,
        data: JSON.parse(sessionStorage.getItem("authToken")),
      });
    }
    // 게시글 카테고리 불러오기
    if (!postCategory) dispatch({ type: LOAD_CATEGORY_REQUEST });
  }, [postCategory]);

  // 로그인 팝업 상태 변경
  const onChangeSigninPopupState = () => {
    setOnSigninPopup((prev) => !prev);
  };

  // 회원가입 팝업 상태 변경
  const onChangeSignupPopupState = () => {
    setOnSignupPopup((prev) => !prev);
  };

  // 비밀번호 찾기 팝업 상태 변경
  const onChangeFindPasswordState = () => {
    setOnFindPasswordPopup((prev) => !prev);
  };

  // 로그아웃
  const onUserLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  return (
    <>
      <Header>
        <PageInner>
          <div className="utils mobile_view">
            {profile ? (
              <>
                <Link href="/mypage">
                  <a className="user_info">
                    {profile.user.profile_nickname} 님
                    <span className="material-icons">expand_more</span>
                  </a>
                </Link>
                <button type="button" onClick={onUserLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={onChangeSigninPopupState}>
                  로그인
                </button>
                <button type="button" onClick={onChangeSignupPopupState}>
                  회원가입
                </button>
              </>
            )}
          </div>
          <h1 className="logo">
            <Link href="/">
              <a>
                <img src="/logo-black.gif" alt="" />
                코비드바이
                <p>코로나바이러스 감염증(COVID-19) 정보 공유 커뮤니티</p>
              </a>
            </Link>
          </h1>
        </PageInner>
      </Header>
      <Container>
        <PageInner>
          <div className="app_utils">
            <LoginForm
              onChangeSignupPopupState={onChangeSignupPopupState}
              onChangeSigninPopupState={onChangeSigninPopupState}
              onChangeFindPasswordState={onChangeFindPasswordState}
              onUserLogout={onUserLogout}
            />
            {pathname === "/" && (
              <>
                <PostSearchForm />
                <PostCategorys />
              </>
            )}
          </div>
          <div className="app_content">{children}</div>
        </PageInner>
      </Container>
      <Footer>
        <PageInner>
          <p>
            <span className="material-icons">email</span>koreacovid20@gmail.com
          </p>
          <p>&copy; Kovid. ALL RIGHTS RESERVED</p>
        </PageInner>
      </Footer>
      {/* 로그인 팝업 */}
      {onSigninPopup && (
        <CustomPopup onClosePopup={onChangeSigninPopupState}>
          <Signin
            onChangeSigninPopupState={onChangeSigninPopupState}
            onChangeFindPasswordState={onChangeFindPasswordState}
          />
        </CustomPopup>
      )}
      {/* 회원가입 팝업 */}
      {onSignupPopup && (
        <CustomPopup onClosePopup={onChangeSignupPopupState}>
          <Signup onChangeSignupPopupState={onChangeSignupPopupState} />
        </CustomPopup>
      )}
      {/* 비밀번호 찾기 팝업 */}
      {onFindPasswordPopup && (
        <CustomPopup onClosePopup={onChangeFindPasswordState}>
          <FindPassword onChangeFindPasswordState={onChangeFindPasswordState} />
        </CustomPopup>
      )}
    </>
  );
};

const Header = styled.header`
  border-bottom: 1px solid #c9c9c9;
  .logo {
    a {
      position: relative;
      display: block;
      padding-left: 55px;
      /* line-height: 45px; */
      font-size: 24px;
      font-weight: 700;
      p {
        margin-top: 4px;
        font-weight: 500;
        font-size: 14px;
        color: #777;
        word-break: keep-all;
      }
      img {
        position: absolute;
        left: 0;
        top: 2px;
        width: 45px;
      }
    }
  }

  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    padding: 14px 0;
    .logo {
      float: left;
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    padding: 8px 0 14px;
    .logo {
      a {
        padding-left: 46px;
        font-size: 18px;
        p {
          font-size: 12px;
        }
        img {
          width: 36px;
        }
      }
    }
    .utils {
      text-align: right;
      button {
        font-size: 14px;
        font-weight: 500;
        line-height: 28px;
      }
      button + button {
        margin-left: 12px;
      }
      .user_info {
        vertical-align: sub;
        font-weight: 700;
        span {
          position: relative;
          bottom: 2px;
          margin-left: 4px;
        }
      }
      .user_info + button {
        margin-left: 12px;
        font-weight: 400;
        color: #727579;
      }
    }
  }
`;
const Container = styled.div`
  /* position: relative; */
  min-height: calc(100vh - 203px);
  padding: 45px 0;
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    .app_utils {
      float: left;
      width: 280px;
    }
    .app_content {
      float: left;
      padding-left: 45px;
      width: calc(100% - 280px);
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .app_utils {
      /* display: none; */
    }
  }
`;
const Footer = styled.footer`
  padding: 65px 0;
  background-color: #0f1215;
  font-size: 14px;
  color: #e3e3e3;
  p {
    span {
      font-size: 18px;
      margin-right: 5px;
    }
  }
  p + p {
    margin-top: 7px;
  }
`;

export default AppContainer;
