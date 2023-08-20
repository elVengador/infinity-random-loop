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
        backgroundColor: `${backgroundColor}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '3px 3px 5px #0000004a',
        width: '700px',
        height: '500px',
        ...style
      }}
    >
      <p style={{ fontSize: '100px', textAlign: 'center', color: color, }}>{value}</p>
    </section>
  )
}