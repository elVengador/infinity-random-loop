import { CSSProperties, ReactNode } from "react"
import styled from "styled-components";

type ThemeType = 'dark' | 'light'

type ButtonProps = {
  children:ReactNode, 
  theme:ThemeType, 
  onclick?:()=>void,
  style?: CSSProperties,
}

const ButtonStyled = styled.button<{ $theme?: ThemeType; }>`
  border: none;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
  background: transparent;
  border-radius: 8px;
  color: ${props=>props.$theme==="dark"  ? "#1E1E1E" : 'rgb(206,206,206)'};
  &:hover {
    background:rgba(133, 133, 133, 0.509); 
  }
`;

export const Button = ({children, onclick, style, theme}:ButtonProps) => {
  return(
    <ButtonStyled 
      onClick={onclick}
      $theme={theme}
      style={{...style}}
      className="custom-button"
      >
      {children}
    </ButtonStyled>
  )
}