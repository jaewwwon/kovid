import styled from "styled-components";

const ErrorMessage = ({ children, textColor }) => <Text textColor={textColor}>{children}</Text>;

const Text = styled.p`
  margin-top: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.textColor || "#e20505"};
`;

export default ErrorMessage;
