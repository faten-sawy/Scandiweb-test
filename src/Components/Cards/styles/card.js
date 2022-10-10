import styled, { keyframes } from "styled-components";

const show = keyframes`
from{
  bottom:0
}
to{
  bottom:6rem
}
to{
  bottom:4rem
}

`;
export const CartButton = styled.button`
  width: 42px;
  height: 42px;
  background-color: #5ece7b;
  border: none;
  border-radius: 50% 50%;
  z-index: 99;
  position: absolute;
  right: 1rem;
  display: none;
  cursor: pointer;
  img {
    filter: brightness(0) invert(1);
  }
`;
export const Container = styled.div`
  position: relative;
  background: #ffffff;
  width: 100%;
  height: 444px;
  margin: 1rem;
  padding: 1rem;
 opacity: ${({ inStock }) => (inStock ? null : 0.4)};
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:hover ${CartButton} {
    display: block;
    animation: ${show} 0.15s linear;
  }
  @media (max-width: 576px) {
    margin: 0;
    margin-bottom: 1rem;
  }
`;
export const CardImage = styled.img`
  position: relative;
  width: 100%;
  height: 70%;
  object-fit: contain;
 
`;
export const CardTitle = styled.p`
  position: relative;
  height: 29px;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 29px;
  display: flex;
  align-items: center;
  margin-bottom: 0;
  color: #1d1f22;
  padding-left: 1rem;
  @font-face {
    font-family: Railway;
    src: url(https://fonts.googleapis.com/css2?family=Caveat&family=Raleway:wght@300;400;500;600;700&display=swap);
  }
`;
export const CardPrice = styled.p`
  position: relative;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
  color: #1d1f22;
  margin: 0;
  margin-top: 1rem;
  padding-left: 1rem;
`;
export const CardLabel = styled.p`
  @font-face {
    font-family: "Railway";
    src: url(https://fonts.googleapis.com/css2?family=Caveat&family=Raleway:wght@300;400;500;600;700&display=swap);
  }
  margin-top: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  z-index: 2;
  line-height: 160%;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  text-align: center;
  text-align: center;
  text-transform: capitalize;
  color: #1d1f22;
  width: 100%;
  border-radius: 0.4;
`;
export const CardRow = styled.div`
  display: flex;
`;
