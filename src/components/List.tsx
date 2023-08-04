type ListProps = {
  list: string,
  
}

export const List = ({list}: ListProps) =>{
  
  return (
    <>
        <option value={list}>
        </option>

    </>
  )
}

// {/* {list} <FaBeer />  */}