import Link from "next/link";
import styled from "styled-components";

export default function Custom404() {
  return (
    <Container>
      <h1>404</h1>
      <p>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </p>
      <Link href="/">
        <a>메인페이지로 이동</a>
      </Link>
    </Container>
  );
}

const Container = styled.section`
  padding: 120px 0;
  text-align: center;
  h1 {
    font-size: 34px;
  }
  a,
  p {
    margin-top: 20px;
    font-size: 14px;
  }
  a {
    display: inline-block;
    padding: 12px 14px;
    background-color: #f5f5f6;
  }
`;
