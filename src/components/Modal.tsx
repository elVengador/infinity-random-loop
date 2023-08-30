import { CSSProperties } from "react"

type ModalProps = {
  onOpen: boolean,
  children: string | JSX.Element,
  backgroundColor: string,
  onCancel?: ()=>void,
  style?: CSSProperties,
}

export const Modal = ({onOpen, children, backgroundColor, style}:ModalProps) =>{
  return(
    <dialog 
      open={onOpen}
      style={{
        height: '100%',
        width: '100%',
        border: 'none',
        position: 'absolute',
        background: backgroundColor,
        ...style
      }}
    >
      {children}
    </dialog>
  )
}
