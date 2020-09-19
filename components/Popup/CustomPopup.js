import styled from "styled-components";
import { Portal } from "react-portal";

const CustomPopup = ({ maxSize, onClosePopup, children }) => {
  return (
    <Portal node={document && document.getElementById("modalRoot")}>
      <PopupLayout maxSize={maxSize}>
        <button className="popup_bg" type="button" onClick={onClosePopup}>
          팝업닫기
        </button>
        <div className="popup_container">
          {children}
          <button type="button" className="close_button" onClick={onClosePopup}>
            <span className="material-icons">close</span>
          </button>
        </div>
      </PopupLayout>
    </Portal>
  );
};

const PopupLayout = styled.div`
  z-index: 5000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .popup_bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: 0;
    opacity: 0.35;
    text-indent: -9999em;
    text-align: left;
    cursor: default;
  }
  .popup_container {
    position: absolute;
    left: 50%;
    top: 0;
    background-color: #fff;
    margin: 45px 0 15px;
    padding: 40px 20px 30px;
    width: 98%;
    max-width: ${(props) => props.maxSize || "365"}px;
    transform: translateX(-50%);
    border-radius: 10px;
    .popup_title {
      font-size: 24px;
      font-weight: bold;
    }
    .popup_content {
      margin-top: 22px;
      line-height: 1.45;
      font-size: 14px;
      .input_field {
        margin-top: 12px;
        label {
          display: block;
          margin-bottom: 4px;
          font-weight: 500;
        }
        .input_text {
          width: 100%;
          height: 42px;
          padding: 0 12px;
          border: 1px solid #dee2e6;
        }
        .btn {
          border: 0;
          height: 42px;
          background-color: #1e1e1e;
          text-align: center;
          color: #fff;
        }
        .input_check {
          display: flex;
          .input_text {
            width: 73%;
          }
          .btn {
            margin-left: 2%;
            width: 25%;
          }
        }
      }
      .check_list_field {
        margin-top: 10px;
        li {
          margin-top: 2px;
          input[type="checkbox"] {
            vertical-align: baseline;
          }
          label {
            padding-left: 2px;
            line-height: 18px;
          }
          a {
            float: right;
            padding: 2px 10px;
            background-color: #f5f5f6;
            border-radius: 4px;
            font-size: 11px;
          }
        }
      }
    }
    .popup_btns {
      margin-top: 24px;
      font-size: 14px;
      .btn {
        display: block;
        width: 100%;
        padding: 15px 0;
        border: 0;
        border-radius: 4px;
        background-color: #1e1e1e;
        font-weight: 500;
        color: #fff;
      }
      .btn + .btn {
        margin-top: 10px;
      }
    }
  }
  .close_button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: 0;
    span {
      font-size: 35px;
      color: #555;
    }
  }
`;

export default CustomPopup;
