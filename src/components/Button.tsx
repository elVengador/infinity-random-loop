import { CSSProperties } from "react"

type ButtonProps = {
  children:string, 
  onClick?:()=>void,
  style?: CSSProperties,
  type?: string,
}

export const Button = ({children, onClick, style}:ButtonProps) => {
  return(
    <button 
      onClick={onClick}
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