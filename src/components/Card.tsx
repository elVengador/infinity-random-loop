import { CSSProperties } from "react"

type CardProps ={
  listTitle: string,
  value: string,
  color?: string,
  style?: CSSProperties
}

export const Card = ({listTitle, value, color, style}:CardProps)=>{
  return(
    <section
      style={{
        boxShadow:`0 0 10px ${color}`,
        borderRadius: '15px',
        width: '50%',
        ...style
      }}
    >
      <h1 style={{textAlign:'center', backgroundColor: `${color}`, color:'white', textShadow:'0 0 3px #000', fontSize:'20px', padding:'5px'}}>{listTitle}</h1>
      <p style={{fontSize: '180px',textAlign: 'center',color: 'rgb(206,206,206', }}>{value}</p>
    </section>
  )
}