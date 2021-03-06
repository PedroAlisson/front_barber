import styled from "styled-components";
import SingUpBackground from "../../assets/sign-up-background.png";
import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #fff;
    }

    a {
      color: #f4efe8;
      display: block;
      margin-top: 18px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4efe8")};
      }
    }
  }
  > a {
    color: #f4ede8;
    display: block;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;

    &:hover {
      color: ${shade(0.2, "#f4ede8")};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${SingUpBackground}) no-repeat;
  background-size: cover;
`;
