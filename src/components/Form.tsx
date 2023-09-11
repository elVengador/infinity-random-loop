import { CSSProperties, useState } from "react"
import { Button } from "./Button"
import { Input } from "./Input"

type FormProps = {
  color: string,
  background: string,
  backgroundInput: string,
  closeForm: ()=>void,
  // addNewItem?: ()=>void,
  sendForm: ()=>void,
  style?: CSSProperties
}

export const Form = ({ color, background, backgroundInput, style, closeForm, sendForm}: FormProps) => {
  const [displayNewItem, setDisplayNewItem] = useState(false)

  function addNewItem(): void {
    throw new Error("Function not implemented.")
  }

  return (
    <form action=""
    style={{
      ...style
    }}
    >
      <fieldset
        style={{
          border: `solid 1px ${color}`,
          color:color,
          background: background,
          borderRadius: '10px',
          paddingTop: '20px',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: '20px',
          fontSize: '20px',
        }}>
        Create a New List
        <Input type="text" placeholder="write name list" color={color} background={backgroundInput} border={color} />
        {!displayNewItem ? <Input type="text" placeholder="write new item" color={color} background={backgroundInput} border={color} /> : null}
        {}
        <div 
        style={{
          fontSize:'10px',
          background: background,
        }}
        >
        <Button children="✕" onClick={closeForm} color={color}
          style={{
            fontSize: '20px',
            position: 'absolute',
            top: '204px',
            left: '40px'
          }}
          />
        <Button children="✕" onClick={addNewItem} color={color}
          style={{
            fontSize: '20px',
            transform: 'rotate(45deg)' ,
          }}
          />
        </div>

        <Button type="submit" children="✓" onClick={sendForm} color={color}
          style={{
            fontSize: '20px',
            position: 'absolute',
            top: '204px',
            right: '40px'
          }}
        />
      </fieldset>
    </form>
  )
}