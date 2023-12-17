import { CSSProperties, ReactNode } from "react"
import styled, { css } from "styled-components";

type ThemeType = 'dark' | 'light'
type ButtonSize = "small" | "medium" | "large"

type ButtonProps = {
  children:ReactNode, 
  theme:ThemeType, 
  onclick?:()=>void,
  title?:string,
  size?:ButtonSize,
  style?: CSSProperties,
}


export const Button = ({children, onclick,title="", style, theme,size="medium"}:ButtonProps) => {
  return(
    <ButtonStyled 
      onClick={onclick}
      $theme={theme}
      style={{...style}}
      className="custom-button"
      title={title}
      $size={size}
      >
      {children}
    </ButtonStyled>
  )
}

  const ButtonStyled = styled.button<{ $theme?: ThemeType;$size:ButtonSize }>`
    border: none;
    padding: 4px;
    font-size: ${props=>{
      if(props.$size==='small') return css`12px;`
      if(props.$size==='large') return css`30px;`
      return css`20px;`
    }};
    cursor: pointer;
    background: transparent;
    border-radius: 8px;
    color: ${props=>props.$theme==="dark"  ? "#1E1E1E" : 'rgb(206,206,206)'};
    &:hover {
      background:rgba(133, 133, 133, 0.509); 
    }
  `;