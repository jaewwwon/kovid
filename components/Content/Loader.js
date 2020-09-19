import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <div></div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  height: 100vh;
  display: flex;
  padding: 20% 0;
  /* align-items: center; */
  justify-content: center;
  div {
    display: block;
    position: absolute;
    width: 28px;
    height: 28px;
    border: 2px solid #ffcd00;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    border-color: #ffcd00 #f1f2f4 #f1f2f4 #f1f2f4;
  }

  @keyframes spin {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
