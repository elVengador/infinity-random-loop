type InputProps = {
  type: string,
  placeholder?: string,
  color?: string,
  background?: string, 
  onChange?: ()=>void,
  onClick?: ()=>void,
  value?: string,
  padding?: string,
  fontSize?: string, 
  border?: string, 
  borderRadius?: string,
}

export const Input = ({
  type, 
  placeholder, 
  color, 
  background,
  onChange, 
  value, 
  padding, 
  fontSize,
  border, 
  borderRadius, 
}:InputProps) => {
  borderRadius = '10px'
  padding = '15px'
  fontSize = '15px'
  return (
    <input 
      type={type}  
      placeholder={placeholder}
      onChange={onChange} 
      value={value}
      style={{
        color: color,
        background: background,
        border: `solid 1px ${border}`,
        borderRadius: borderRadius,
        padding: padding,
        fontSize: fontSize,
      }}
    />
  )
}