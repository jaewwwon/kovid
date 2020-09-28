import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styled from "styled-components";
import { PageInner, BREAK_POINT_TABLET } from "./CommonStyle";
import CustomPopup from "../Popup/CustomPopup";
import LoginForm from "../Content/LoginForm";
import Signin from "../../containers/Auth/Signin";
import Signup from "../../containers/Auth/Signup";
import FindPassword from "../../containers/Auth/FindPassword";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFO, LOG_OUT_REQUEST } from "../../reducers/user";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);

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
  }, []);

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
          <h1 className="logo">
            <Link href="/">
              <a>
                <img src="/logo-black.gif" alt="" />
                코비드바이
                {/* <p>
                  코로나바이러스 감염증(COVID-19) <span>정보 공유 커뮤니티</span>
                </p> */}
              </a>
            </Link>
          </h1>
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
        </PageInner>
      </Header>
      <Container>
        <PageInner>
          <LoginForm
            onChangeSignupPopupState={onChangeSignupPopupState}
            onChangeSigninPopupState={onChangeSigninPopupState}
            onChangeFindPasswordState={onChangeFindPasswordState}
            onUserLogout={onUserLogout}
          />
          <Content>{children}</Content>
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

const Header = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #c9c9c9;
  .logo {
    float: left;
    a {
      position: relative;
      display: block;
      padding-left: 55px;
      line-height: 45px;
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
  .utils {
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
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    .utils {
      float: right;
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .logo {
      p {
        span {
          display: block;
        }
      }
    }
    .utils {
      position: absolute;
      right: 20px;
      top: 0;
    }
  }
`;
const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 203px);
  padding: 45px 0;
`;
const Content = styled.div`
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    position: relative;
    padding-left: 310px;
  }
`;
const Footer = styled.div`
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

export default AppLayout;
