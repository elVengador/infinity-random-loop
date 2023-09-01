import { CSSProperties } from "react"
import styled from "styled-components";

type ThemeType = 'dark' | 'light'

type ButtonProps = {
  children:string, 
  theme:ThemeType, 
  onclick?:()=>void,
  style?: CSSProperties,
}

const ButtonStyled = styled.button<{ $theme?: ThemeType; }>`
  border: none;
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
  color: ${props=>props.$theme==="dark"  ? "#1E1E1E" : 'rgb(206,206,206)'};
  background: transparent;
  /* background:  ${props=>props.$theme==="dark" ? 'rgb(206,206,206)' : "#1E1E1E"}; */
  &:hover {
    border-radius: 8px;
    background:rgba(133, 133, 133, 0.509); 
    /* background: red; */
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