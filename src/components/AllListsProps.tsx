import { Button } from "./Button";

type AllListsProps = { options:{value:string,label:string}[] };

export const AllLists = ({ options }: AllListsProps) => {
  return (
    <div style={{
      border: 'solid 2px pink',
      width: '280px',
      display: 'flex',
      flexDirection:"column",
    }}      >
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>

      <label htmlFor="allLists">All Lists</label>
      <div>
      {/* <Button style={{padding:"4px"}}>+</Button>
      <Button style={{padding:"4px"}}>/</Button> */}
      </div>
      </div>
      <select
        name="allLists"
        id=""
        style={{
          width: "100%",
          padding:"4px 8px"
        }}
      >
        {options.map((cur,idx)=><option key={idx} value={cur.value} >{cur.label}</option>)}
      </select>
    </div>
  );
};
