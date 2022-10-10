import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ color }) => color};
  border: ${({ color }) => (color !== "#FFFFFF" ? "none" : "1px solid gray")};
  width: 32px;
  height: 32px;
  left: 84px;
  top: 2px;
  border-radius: 0px;
  margin: 2px;
`;
