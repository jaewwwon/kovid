import { useCallback, useState, useEffect } from "react";
import ErrorMessage from "../../components/Content/ErrorMessage";
import { useSelector, useDispatch } from "react-redux";
import { NICKNAME_STATE_INIT, UPDATE_NICKNAME_REQUEST } from "../../reducers/user";

const NicknameSection = () => {
  const dispatch = useDispatch();
  const { profile, updateNicknameSuccess, updateNicknameError } = useSelector(
    (state) => state.user,
  );
  const [nickname, setNickname] = useState("");
  const [activeNicknameForm, setActiveNicknameForm] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState(false);

  useEffect(() => {
    // 닉네임 초기값 설정
    if (profile) setNickname(profile.user.profile_nickname);
  }, [profile]);

  useEffect(() => {
    if (updateNicknameError === "already_exist_nickname") {
      setNicknameErrorMessage(true);
    } else {
      setNicknameErrorMessage(false);
    }
  }, [updateNicknameError]);

  useEffect(() => {
    if (updateNicknameSuccess) onChangeActiveNicknameForm();
  }, [updateNicknameSuccess]);

  // 닉네임 변경 폼 활성화 값
  const onChangeActiveNicknameForm = useCallback(
    (e) => {
      if (activeNicknameForm) {
        setNickname(profile.user.profile_nickname); // 입력값 초기화
      }
      setActiveNicknameForm((prev) => !prev);
    },
    [activeNicknameForm, profile],
  );

  // 닉네임 입력 값
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  // 닉네임 변경
  const onSubmitNickname = useCallback(
    (e) => {
      e.preventDefault();
      if (!activeNicknameForm) {
        dispatch({ type: NICKNAME_STATE_INIT });
        setActiveNicknameForm(true); // 입력란 활성화
        return;
      }
      dispatch({
        type: UPDATE_NICKNAME_REQUEST,
        data: {
          profile_nickname: nickname,
        },
      });
    },
    [activeNicknameForm, nickname],
  );

  return (
    <>
      <form onSubmit={onSubmitNickname}>
        <label htmlFor="nickname">닉네임</label>
        <div className="input_text">
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={onChangeNickname}
            disabled={activeNicknameForm ? false : true}
          />
          {activeNicknameForm && (
            <button className="btn" type="button" onClick={onChangeActiveNicknameForm}>
              취소
            </button>
          )}
          <button className="btn" type="submit">
            변경
          </button>
        </div>
        {activeNicknameForm && nicknameErrorMessage && (
          <ErrorMessage>이미 존재하는 닉네임입니다.</ErrorMessage>
        )}
      </form>
    </>
  );
};

export default NicknameSection;
