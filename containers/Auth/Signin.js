import { useEffect, useCallback } from "react";
import { Loader } from "../../components/Layout/CommonStyle";
import ErrorMessage from "../../components/Content/ErrorMessage";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../../reducers/user";

const Signin = ({ onChangeSigninPopupState, onChangeFindPasswordState }) => {
  const dispatch = useDispatch();
  const { profile, logInLoading, logInError } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput(""); // 로그인 이메일
  const [password, onChangePassword] = useInput(""); // 로그인 비밀번호

  useEffect(() => {
    // 로그인에 성공했을 경우
    if (profile) {
      // 로그인 팝업 닫기
      onChangeSigninPopupState();
    }
  }, [profile]);

  // 로그인 요청
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          profile_email: email,
          password,
        },
      });
    },
    [email, password],
  );

  return (
    <>
      <h2 className="popup_title">로그인</h2>
      <div className="popup_content">
        <form onSubmit={onSubmitForm}>
          <div className="input_field">
            <input
              className="input_text"
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="이메일"
              required
            />
          </div>
          <div className="input_field">
            <input
              className="input_text"
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="비밀번호"
              required
            />
          </div>
          {/* {logInError && <ErrorMessage>로그인 정보가 일치하지 않습니다.</ErrorMessage>} */}
          <button type="button" onClick={onChangeFindPasswordState} style={{ marginTop: "8px" }}>
            비밀번호 찾기
          </button>
          <div className="popup_btns">
            <button type="submit" className="btn">
              {logInLoading && <Loader className="material-icons">autorenew</Loader>}
              로그인
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signin;
