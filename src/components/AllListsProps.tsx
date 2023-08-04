
type AllListsProps = {
  children: JSX.Element
}

export const AllLists = ({ children}: AllListsProps) => {


  return (
    <>
    
      <label htmlFor="allLists">All Lists</label>
      <select 
        name="allLists" id=""
        style={{
          width: '200px',
        }}
      >
        {children}
      </select>
    </>
  )
}
