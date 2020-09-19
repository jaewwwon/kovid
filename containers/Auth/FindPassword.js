import { useEffect, useCallback, useState } from "react";
import { Loader } from "../../components/Layout/CommonStyle";
import ErrorMessage from "../../components/Content/ErrorMessage";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { FIND_PASSWORD_REQUEST } from "../../reducers/user";

const FindPassword = ({ onChangeFindPasswordState }) => {
  const dispatch = useDispatch();
  const { findPasswordSuccess, findPasswordError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput(""); // 로그인 이메일
  const [submitResult, setSuccessResult] = useState(false);

  // useEffect(() => {
  //   // 요청에 성공했을 경우
  //   if (findPasswordSuccess) {
  //     setSuccessResult(true);
  //   }
  // }, [findPasswordSuccess]);

  // useEffect(() => {
  //   // 요청에 실패했을 경우
  //   if (findPasswordError === "not_found_user") {
  //     setSuccessResult(true);
  //   }
  // }, [findPasswordError, submitResult]);

  // 비밀번호 찾기 요청
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: FIND_PASSWORD_REQUEST,
        data: {
          profile_email: email,
        },
      });
    },
    [email],
  );

  return (
    <>
      <h2 className="popup_title">비밀번호 찾기</h2>
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
          {/* {submitResult && findPasswordSuccess && (
            <ErrorMessage textColor="#333">
              해당 메일로 임시 비밀번호가 전송되었습니다.
            </ErrorMessage>
          )}
          {submitResult && findPasswordError && (
            <ErrorMessage textColor="#333">가입정보가 없습니다.</ErrorMessage>
          )} */}
          <div className="popup_btns">
            <button type="submit" className="btn">
              이메일 전송
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FindPassword;
