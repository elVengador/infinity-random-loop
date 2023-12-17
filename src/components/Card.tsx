import { CSSProperties } from "react"

type CardProps = {
  value: string,
  backgroundColor: string,
  color: string,
  style?: CSSProperties
}

export const Card = ({ value, backgroundColor, color, style }: CardProps) => {
  return (
    <section
      style={{
        padding:"16px",
        backgroundColor: `${backgroundColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '3px 3px 5px #0000004a',
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      <p style={{ fontSize: '100px', textAlign: 'center', color: color, }}>{value}</p>
    </section>
  )
}