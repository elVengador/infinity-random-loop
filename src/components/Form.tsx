import { CSSProperties } from "react"
import { Button } from "./Button"

type FormProps = {
  color: string,
  closeModal: ()=>void,
  style?: CSSProperties
}

export const Form = ({ color, style, closeModal }: FormProps) => {

  return (
    <form action=""
    style={{
      ...style
    }}
    >
      <fieldset
        style={{
          border: `solid 1px ${color}`,
          borderRadius: '10px',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: '20px',
          fontSize: '20px',
        }}>
        Create a New List
        <input type="text" name="titleList" id="titleListForm" placeholder="write name list"
          style={{
            padding: '15px',
            fontSize: '15px',
            border: 'none',
            borderRadius: '10px',
          }}
        />
        <input type="text" name="item" id="item" placeholder="write new item"
          style={{
            padding: '15px',
            fontSize: '15px',
            border: 'none',
            borderRadius: '10px',
          }}
        />
        <div 
        style={{
          fontSize:'10px'
        }}
        >
        <Button children="delete" />
        <Button children="+" />
        </div>

        <Button type="submit" children="save" onClick={closeModal}
          style={{
            border: `solid 1px ${color}`,
            borderRadius: '10px',
            padding: '5px 10px',
          }}
        />
      </fieldset>
    </form>
  )
}