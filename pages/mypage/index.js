import { useCallback, useState, useEffect } from "react";
import DefaultErrorPage from "next/error";
import styled from "styled-components";
import { Card, BREAK_POINT_TABLET } from "../../components/Layout/CommonStyle";
import CustomPopup from "../../components/Popup/CustomPopup";
import NicknameSection from "../../containers/Mypage/NicknameSection";
import PasswordSection from "../../containers/Mypage/PasswordSection";
import { useSelector, useDispatch } from "react-redux";
import { LEAVE_USER_REQUEST } from "../../reducers/user";

const Mypage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [onLeavePopup, setOnLeavePopup] = useState(false);
  const [leaveCheckText, setLeaveCheckText] = useState("");
  const [leveTextError, setLeaveTextError] = useState(true);

  // 회원탈퇴 문구 입력 값
  const onChangeLeaveCheckText = useCallback((e) => {
    e.target.value === "탈퇴합니다" ? setLeaveTextError(false) : setLeaveTextError(true);
    setLeaveCheckText(e.target.value);
  }, []);

  // 회원 탈퇴 팝업 활성화 상태 변경
  const onChangeLeavePopupState = useCallback(() => {
    // 팝업 상태 초기화
    if (onLeavePopup) {
      setLeaveCheckText("");
      setLeaveTextError(true);
    }
    setOnLeavePopup((prev) => !prev);
  }, [onLeavePopup]);

  // 회원 탈퇴
  const onSubmitLeave = useCallback(
    (e) => {
      e.preventDefault();
      if (leaveCheckText !== "탈퇴합니다") return alert("문구를 정확하게 입력하세요.");
      dispatch({
        type: LEAVE_USER_REQUEST,
      });
    },
    [leaveCheckText],
  );

  // 로그인 상태가 아닐 경우, 404 페이지 리턴
  if (!profile) return <DefaultErrorPage statusCode={404} />;

  return (
    <Container>
      <Card>
        <div className="card-head">
          <h2>내정보</h2>
        </div>
        <div className="card-body">
          {/* 닉네임 변경 */}
          <NicknameSection />
          {/* 비밀번호 변경 */}
          <PasswordSection />
        </div>
      </Card>
      <Card>
        <div className="card-head">
          <h2>회원탈퇴</h2>
        </div>
        <div className="card-body">
          <h3>
            유의사항<span>회원탈퇴 전, 꼭 확인하세요.</span>
          </h3>
          <ul className="notice_list">
            <li>
              회원이 작성한 콘텐츠(게시물, 댓글 등)는 자동적으로 삭제되지 않으며, 만일 삭제를
              원하시면 탈퇴 이전에 삭제가 필요합니다.
            </li>
            <li>탈퇴 후 동일한 아이디로 재가입이 어렵습니다.</li>
            <li>회원탈퇴를 하시면 위 내용에 동의하는 것으로 간주됩니다.</li>
          </ul>
          <div className="button_wrap">
            <button type="button" onClick={onChangeLeavePopupState}>
              회원탈퇴
            </button>
          </div>
        </div>
      </Card>
      {/* 회원탈퇴 확인 팝업 */}
      {onLeavePopup && (
        <CustomPopup onClosePopup={onChangeLeavePopupState}>
          <h2 className="popup_title">회원탈퇴</h2>
          <div className="popup_content">
            <p>회원탈퇴를 진행하시겠습니까?</p>
            <p>회원탈퇴 전, 유의사항을 꼭 확인하세요.</p>
            <p>
              동의하실 경우 <strong>탈퇴합니다</strong> 문구를 입력하세요.
            </p>
            <form onSubmit={onSubmitLeave}>
              <div className="input_field">
                <input
                  className="input_text"
                  type="text"
                  value={leaveCheckText}
                  onChange={onChangeLeaveCheckText}
                  required
                />
              </div>
              <div className="popup_btns">
                <button type="submit" className="btn" disabled={leveTextError}>
                  약관에 동의하며, 회원탈퇴를 진행합니다.
                </button>
              </div>
            </form>
          </div>
        </CustomPopup>
      )}
    </Container>
  );
};

const Container = styled.div`
  .notice_list {
    margin-bottom: 12px;
  }
  .button_wrap {
    margin-top: 40px;
    text-align: center;
    button {
      width: 165px;
      height: 42px;
      background-color: #dd0707;
      font-size: 14px;
      color: #fff;
    }
  }
  form {
    label {
      font-weight: 500;
      font-size: 14px;
    }
    .input_text {
      position: relative;
      display: flex;
      max-width: 400px;
      margin-top: 10px;
      font-size: 14px;
      input {
        width: 100%;
        height: 42px;
        padding: 0 12px;
        border: 1px solid #dee2e6;
      }
    }
    .btn {
      margin-left: 4px;
      height: 42px;
      padding: 0 14px;
      background-color: #6f6f6f;
      font-size: 12px;
      color: #fff;
      word-break: keep-all;
    }
    .btn + .btn {
      background-color: #0f1215;
    }
    .form_buttons {
      margin-top: 10px;
      .btn:first-child {
        margin-left: 0;
      }
    }
  }
  form + form {
    margin-top: 25px;
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    form + form {
      .input_text {
        max-width: none;
        padding-right: 0;
      }
    }
  }
`;

export default Mypage;
