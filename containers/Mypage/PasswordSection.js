import { useCallback, useState, useEffect } from "react";
import ErrorMessage from "../../components/Content/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PASSWORD_REQUEST } from "../../reducers/user";

const PasswordSection = () => {
  const dispatch = useDispatch();
  const { updatePasswordSuccess, updatePasswordError } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [activePasswordForm, setActivePasswordForm] = useState(false);

  useEffect(() => {
    // 비밀번호 변경에 성공했을 경우
    if (updatePasswordSuccess) {
      resetForm();
      if (activePasswordForm) onChangeActivePasswordForm();
    }
  }, [updatePasswordSuccess]);

  useEffect(() => {
    // 비밀번호 변경에 실패했을 경우
    if (updatePasswordError === "current_password_is_different") {
      console.log("updatePasswordError", updatePasswordError);
      setPasswordError(true);
    }
  }, [updatePasswordError]);

  // 입력값 초기화
  const resetForm = useCallback(() => {
    setPassword("");
    setNewPassword("");
    setNewPasswordCheck("");
    setPasswordError(false);
    setNewPasswordError(false);
  }, []);

  // 현재 비밀번호 값
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  // 새로운 비밀번호 값
  const onChangeNewPassword = useCallback((e) => {
    setNewPassword(e.target.value);
  }, []);

  // 새로운 비밀번호 확인 값
  const onChangeNewPasswordCheck = useCallback((e) => {
    setNewPasswordCheck(e.target.value);
  }, []);

  // 비밀번호 체크 정규식
  const isPasswordCheck = useCallback((value) => {
    const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z]).*$/; // 최소 하나의 문자, 숫자 포함
    return regExp.test(value); // 형식에 맞는 경우 true 리턴
  }, []);

  // 비밀번호 변경 폼 활성화 값
  const onChangeActivePasswordForm = useCallback(
    (e) => {
      if (activePasswordForm) {
        resetForm();
      }
      setActivePasswordForm((prev) => !prev);
    },
    [activePasswordForm],
  );

  // 비밀번호 변경
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!activePasswordForm) return setActivePasswordForm(true); // 입력란 활성화
      if (!isPasswordCheck(newPassword))
        return alert("비밀번호는 최소 8자, 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다.");
      if (newPassword !== newPasswordCheck) {
        setNewPasswordError(true);
        return;
      } else {
        setNewPasswordError(false);
      }
      dispatch({
        type: UPDATE_PASSWORD_REQUEST,
        data: {
          current_password: password,
          new_password: newPassword,
        },
      });

      // "current_password_is_different"
    },
    [activePasswordForm, password, newPassword, newPasswordCheck],
  );

  return (
    <form onSubmit={onSubmitForm}>
      <label htmlFor="password">비밀번호</label>
      {activePasswordForm && (
        <>
          <div className="input_text">
            <input
              id="password"
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="현재 비밀번호"
            />
          </div>
          {passwordError && <ErrorMessage>현재 비밀번호가 일치하지 않습니다.</ErrorMessage>}
          <div className="input_text">
            <input
              type="password"
              value={newPassword}
              onChange={onChangeNewPassword}
              placeholder="새 비밀번호(최소 8자, 영문+숫자 조합)"
            />
          </div>
          <div className="input_text">
            <input
              type="password"
              value={newPasswordCheck}
              onChange={onChangeNewPasswordCheck}
              placeholder="새 비밀번호 확인"
            />
          </div>
          {newPasswordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </>
      )}
      <div className="form_buttons">
        {activePasswordForm && (
          <button className="btn" type="button" onClick={onChangeActivePasswordForm}>
            취소
          </button>
        )}
        <button className="btn" type="submit">
          {!activePasswordForm && "비밀번호"} 변경
        </button>
      </div>
    </form>
  );
};

export default PasswordSection;
