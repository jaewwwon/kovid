import Link from "next/link";
import styled from "styled-components";
import { BREAK_POINT_TABLET } from "../Layout/CommonStyle";
import { useSelector } from "react-redux";

const LoginForm = ({
  onChangeSignupPopupState,
  onChangeSigninPopupState,
  onChangeFindPasswordState,
  onUserLogout,
}) => {
  const { profile } = useSelector((state) => state.user);

  return (
    <Container>
      {profile ? (
        <>
          <p className="nickname">{profile.user.profile_nickname} 님</p>
          <div className="links">
            <Link href="/mypage">
              <a>
                내정보 설정 <span className="material-icons">lock</span>
              </a>
            </Link>
            <Link href="/user/posts/[id]" as={`/user/posts/${profile?.user.idx}`}>
              <a>작성한 글</a>
            </Link>
            <Link href="/user/comments/[id]" as={`/user/comments/${profile?.user.idx}`}>
              <a>댓글 단 글</a>
            </Link>
          </div>
          <button className="logout_button" type="button" onClick={onUserLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <p>로그인하고 정보 공유에 도움이 되어주세요.</p>
          <button className="login_button" type="button" onClick={onChangeSigninPopupState}>
            로그인
          </button>
          <div className="utils">
            <button type="button" onClick={onChangeFindPasswordState}>
              비밀번호 찾기
            </button>
            <button type="button" onClick={onChangeSignupPopupState}>
              회원가입
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  @media only screen and (min-width: ${BREAK_POINT_TABLET + 1}px) {
    position: relative;
    margin-bottom: 20px;
    padding: 24px 10px;
    background-color: #f5f5f6;
    border: 1px solid #ccc;
    font-size: 12px;
    color: #7f858a;
    /* 로그아웃 상태 */
    .login_button {
      display: block;
      width: 100%;
      height: 38px;
      margin-top: 7px;
      background-color: #fff;
      border: 1px solid #ccc;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    .utils {
      margin-top: 10px;
      button {
        color: #7f858a;
      }
      button + button {
        position: relative;
        padding-left: 8px;
        margin-left: 8px;
      }
      button + button:after {
        content: "";
        position: absolute;
        left: 0;
        top: 3px;
        width: 1px;
        height: 12px;
        background-color: #ccc;
      }
    }
    /* 로그인 상태 */
    .nickname {
      padding-right: 70px;
      font-size: 16px;
      font-weight: 500;
      color: #333;
    }
    .links {
      margin-top: 10px;
      .material-icons {
        font-size: 12px;
        vertical-align: bottom;
      }
      a + a {
        margin-left: 8px;
      }
      a + a:before {
        content: "·";
        margin-right: 8px;
      }
    }
    .logout_button {
      position: absolute;
      right: 10px;
      top: 20px;
      background-color: #b5b5b5;
      border-radius: 24px;
      padding: 4px 10px;
      color: #fff;
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    display: none;
  }
`;

export default LoginForm;
