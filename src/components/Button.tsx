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
      type="button"
      onClick={onClick}
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