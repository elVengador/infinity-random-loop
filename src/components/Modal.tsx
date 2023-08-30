import { CSSProperties } from "react"

type ModalProps = {
  onOpen: boolean,
  children: string | JSX.Element,
  onCancel?: ()=>void,
  style?: CSSProperties,
}

export const Modal = ({onOpen, children, style}:ModalProps) =>{
  return(
    <dialog 
      open={onOpen}
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        ...style
      }}
    >
      {children}
    </dialog>
  )
}
