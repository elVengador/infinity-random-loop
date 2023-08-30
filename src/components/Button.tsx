import { CSSProperties } from "react"

type ButtonProps = {
  children:string, 
  onClick?:()=>void,
  color:string,
  style?: CSSProperties,
  type?: string,
}

export const Button = ({children, onClick, color,style}:ButtonProps) => {
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
        color: color,
        ...style
      }}
    >
      {children}
    </button>
  )
}