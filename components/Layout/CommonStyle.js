import styled from "styled-components";

// responsive breakpoint
export const BREAK_POINT_PC = 1280;
export const BREAK_POINT_TABLET = 768;
export const BREAK_POINT_MOBILE = 600;

// loader icon
export const Loader = styled.span`
  margin-right: 10px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// page layout
export const PageInner = styled.div`
  position: relative;
  max-width: ${BREAK_POINT_PC}px;
  margin: 0 auto;
  padding: 0 40px;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  .mobile_view {
    display: none;
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .pc_view {
      display: none;
    }
    .mobile_view {
      display: block;
    }
    padding: 0 12px;
  }
`;

export const Card = styled.div`
  margin-bottom: 24px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  overflow: hidden;
  .card-head {
    padding: 12px 20px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #dfdfdf;
    font-size: 15px;
    font-weight: 500;
  }
  .card-body {
    padding: 20px;
    h3 {
      span {
        margin-left: 5px;
        font-size: 14px;
        font-weight: 400;
        vertical-align: baseline;
      }
    }
    .notice_list {
      margin-top: 10px;
      padding: 15px 10px;
      background-color: #ededed;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.35;
      li {
        position: relative;
        padding-left: 9px;
        word-break: keep-all;
      }
      li:after {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 3px;
        height: 3px;
        background-color: #333;
        border-radius: 50%;
      }
      li + li {
        margin-top: 5px;
      }
    }
  }
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    .card-body {
      h3 {
        span {
          display: block;
          margin: 4px 0 0 0;
        }
      }
    }
  }
`;
