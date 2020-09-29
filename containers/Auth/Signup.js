import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Loader } from "../../components/Layout/CommonStyle";
import ErrorMessage from "../../components/Content/ErrorMessage";
import useInput from "../../hooks/useInput";
import useCheck from "../../hooks/useCheck";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../../reducers/user";
import { LOAD_TERMS_REQUEST } from "../../reducers/auth";

const Signup = ({ onChangeSignupPopupState }) => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpSuccess } = useSelector((state) => state.user);
  const { terms } = useSelector((state) => state.auth);

  const [username, onChangeUsername] = useInput(""); // 회원 닉네임
  const [useremail, onChangeUseremail] = useInput(""); // 회원 이메일
  const [userpassword, setUserpassword] = useState(""); // 회원 비밀번호
  const [userpasswordCheck, setUserpasswordCheck] = useState(""); // 회원 비밀번호 확인
  const [termA, onChangeTermA] = useCheck(false); // 프로필 정보 추가 및 수집 동의
  const [termB, onChangeTermB] = useCheck(false); // 광고성 정보 수신 동의
  const [termC, onChangeTermC] = useCheck(false); // 개인정보 수집 및 이용약관 동의
  const [termD, onChangeTermD] = useCheck(false); // 서비스 이용약관 동의
  const [isUserExist, setIsUserExist] = useState(null); // 회원(이메일) 중복
  const [isNicknameExist, setIsNicknameExist] = useState(null); // 닉네임 중복
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 에러

  useEffect(() => {
    // 약관 url 불러오기
    if (!terms) dispatch({ type: LOAD_TERMS_REQUEST });
  }, [terms]);

  useEffect(() => {
    // 회원가입에 성공했을 경우
    if (signUpSuccess) {
      alert("가입이 완료됐습니다.");
      // 팝업 닫기
      onChangeSignupPopupState();
    }
  }, [signUpSuccess]);

  // 비밀번호 값
  const onChangeUserpassword = useCallback(
    (e) => {
      setUserpassword(e.target.value);
      userpasswordCheck.length > 0 && userpasswordCheck !== e.target.value
        ? setPasswordError(true)
        : setPasswordError(false);
    },
    [userpasswordCheck],
  );

  // 비밀번호 확인값
  const onChangeUserpasswordCheck = useCallback(
    (e) => {
      setUserpasswordCheck(e.target.value);
      userpassword !== e.target.value ? setPasswordError(true) : setPasswordError(false);
    },
    [userpassword],
  );

  // 이메일 체크 정규식
  const isEmailCheck = useCallback((value) => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(value); // 형식에 맞는 경우 true 리턴
  }, []);

  // 비밀번호 체크 정규식
  const isPasswordCheck = useCallback((value) => {
    // const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 최소 하나의 문자, 숫자, 특수문자 포함
    const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z]).*$/; // 최소 하나의 문자, 숫자 포함
    return regExp.test(value); // 형식에 맞는 경우 true 리턴
  }, []);

  // 이메일 중복확인
  const onUserCheck = useCallback(async () => {
    if (!isEmailCheck(useremail)) return alert("이메일 주소 형식이 아닙니다.");
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/check`, {
        profile_email: useremail,
      })
      .then(() => setIsUserExist(false))
      .catch(() => setIsUserExist(true));
  }, [useremail]);

  // 닉네임 중복확인
  const onNicknameCheck = useCallback(async () => {
    if (username.length === 0) return alert("닉네임을 입력하세요.");
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users/nickname`, {
        profile_nickname: username,
      })
      .then(() => setIsNicknameExist(false))
      .catch(() => setIsNicknameExist(true));
  }, [username]);

  // 회원가입
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (isUserExist === null) return alert("이메일 중복확인을 진행해주세요.");
      if (isUserExist) return alert("사용할 수 없는 이메일입니다.");
      if (isNicknameExist === null) return alert("닉네임 중복확인을 진행해주세요.");
      if (isNicknameExist) return alert("사용할 수 없는 닉네임입니다.");
      if (passwordError) return alert("비밀번호가 일치하지 않습니다.");
      if (!isPasswordCheck(userpassword))
        return alert("비밀번호는 최소 8자, 최소 하나의 문자 및 하나의 숫자를 포함해야 합니다.");
      if (!termA || !termB || !termC || !termD) return alert("약관에 모두 동의해주세요.");
      dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          profile_email: useremail,
          profile_nickname: username,
          password: userpassword,
        },
      });
    },
    [
      isUserExist,
      isNicknameExist,
      passwordError,
      termA,
      termB,
      termC,
      termD,
      username,
      userpassword,
      useremail,
    ],
  );

  return (
    <>
      <h2 className="popup_title">회원가입</h2>
      <div className="popup_content">
        <form onSubmit={onSubmitForm}>
          <div className="input_field">
            <label htmlFor="email">이메일</label>
            <div className="input_check">
              <input
                id="email"
                className="input_text"
                type="email"
                value={useremail}
                onChange={onChangeUseremail}
                placeholder="이메일"
                required
              />
              <button className="btn" type="button" onClick={onUserCheck}>
                중복확인
              </button>
            </div>
            {isUserExist === false && (
              <ErrorMessage textColor="#0497cd">사용가능한 이메일입니다.</ErrorMessage>
            )}
            {isUserExist === true && <ErrorMessage>사용 불가능한 이메일입니다.</ErrorMessage>}
          </div>
          <div className="input_field">
            <label htmlFor="nickname">닉네임</label>
            <div className="input_check">
              <input
                id="nickname"
                className="input_text"
                type="text"
                value={username}
                onChange={onChangeUsername}
                placeholder="닉네임"
                required
              />
              <button className="btn" type="button" onClick={onNicknameCheck}>
                중복확인
              </button>
            </div>
            {isNicknameExist === false && (
              <ErrorMessage textColor="#0497cd">사용가능한 닉네임입니다.</ErrorMessage>
            )}
            {isNicknameExist === true && <ErrorMessage>사용 불가능한 닉네임입니다.</ErrorMessage>}
          </div>
          <div className="input_field">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              className="input_text"
              type="password"
              value={userpassword}
              onChange={onChangeUserpassword}
              placeholder="비밀번호(최소 8자, 영문+숫자 조합)"
              required
            />
          </div>
          <div className="input_field">
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <input
              id="passwordCheck"
              className="input_text"
              type="password"
              value={userpasswordCheck}
              onChange={onChangeUserpasswordCheck}
              placeholder="비밀번호 확인"
              required
            />
          </div>
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          <ul className="check_list_field">
            <li>
              <input id="termA" type="checkbox" value={termA} onChange={onChangeTermA} required />
              <label htmlFor="termA">프로필 정보 추가 수집 동의</label>
              <a href={terms?.additional} target="_blank" title="새창">
                약관보기
              </a>
            </li>
            <li>
              <input id="termB" type="checkbox" value={termB} onChange={onChangeTermB} required />
              <label htmlFor="termB">광고성 정보 수신 동의</label>
              <a href={terms?.advertising} target="_blank" title="새창">
                약관보기
              </a>
            </li>
            <li>
              <input id="termC" type="checkbox" value={termC} onChange={onChangeTermC} required />
              <label htmlFor="termC">개인정보 수집 및 이용약관</label>
              <a href={terms?.privacy} target="_blank" title="새창">
                약관보기
              </a>
            </li>
            <li>
              <input id="termD" type="checkbox" value={termD} onChange={onChangeTermD} required />
              <label htmlFor="termD">서비스 이용약관</label>
              <a href={terms?.service} target="_blank" title="새창">
                약관보기
              </a>
            </li>
          </ul>
          <div className="popup_btns">
            <button type="submit" className="btn">
              {signUpLoading && <Loader className="material-icons">autorenew</Loader>}
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
