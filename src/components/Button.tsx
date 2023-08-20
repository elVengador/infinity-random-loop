import { CSSProperties } from "react"

type ButtonProps = {
  children:string, 
  onclick?:()=>void,
  style?: CSSProperties,
}

export const Button = ({children, onclick, style}:ButtonProps) => {
  return(
    <button 
      onClick={onclick}
      style={{
        border: 'none',
        padding: '10px',
        fontSize: '120%',
        cursor: 'pointer',
        background: 'none',
        ...style
      }}
    >
      {children}
    </button>
  )
}