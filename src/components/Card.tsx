import { CSSProperties } from "react"

type CardProps = {
  value: string,
  backgroundColor?: string,
  style?: CSSProperties
}

export const Card = ({ value, backgroundColor, style }: CardProps) => {
  return (
    <section
      style={{
        backgroundColor: `#${backgroundColor}`,
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
      <p style={{ fontSize: '100px', textAlign: 'center', color: 'rgb(206,206,206', }}>{value}</p>
    </section>
  )
}