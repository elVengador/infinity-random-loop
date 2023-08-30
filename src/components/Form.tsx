import { CSSProperties } from "react"
import { Button } from "./Button"

type FormProps = {
  color: string,
  background: string,
  backgroundInput: string,
  closeForm: ()=>void,
  addNewItem: ()=>void,
  sendForm: ()=>void,
  style?: CSSProperties
}

export const Form = ({ color, background, backgroundInput, style, closeForm, addNewItem, sendForm}: FormProps) => {

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: '20px',
          fontSize: '20px',
        }}>
        Create a New List
        <input type="text" name="titleList"  placeholder="write name list"
          style={{
            color:color,
            background: backgroundInput,
            padding: '15px',
            fontSize: '15px',
            border: 'none',
            borderRadius: '10px',
          }}
          />
        <input type="text" name="item"  placeholder="write new item"
          style={{
            color:color,
            background: backgroundInput,
            padding: '15px',
            fontSize: '15px',
            border: 'none',
            borderRadius: '10px',
          }}
        />
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
            top: '0px',
            right: '0px'
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
          }}
        />
      </fieldset>
    </form>
  )
}