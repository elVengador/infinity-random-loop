import { CSSProperties } from "react"

type ButtonProps = {
  children:string, 
  onclick?:()=>void,
  style?: CSSProperties,
}

export const Button = ({children, onclick, style}:ButtonProps) => {
  return(
    <button 
      onClick={()=>onclick}
      style={{
        borderRadius: '10px',
        padding: '10px',
        fontSize: '120%',
        background: '#00a0e1',
        ...style
      }}
    >
      {children}
    </button>
  )
}