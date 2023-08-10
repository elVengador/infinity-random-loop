import { SelectedList } from "../App";
import { Button } from "./Button";

export type Lists= {[key:string]:{value:string[], label:string}}

type AllListsProps = { 
  lists:Lists
  options:{value:string,label:string}[],
  value: SelectedList | null, 
  defaultValue?: string,
  onChange: (value:SelectedList | null)=> void
 };


 export const AllLists = ({ lists, options, value, defaultValue, onChange }: AllListsProps) => {
   const onChangeLists = (value:string)=> {
    const tt = lists[value] 
    if(!tt)return
    
    const selectedList:SelectedList = {value, label: tt.label}
    onChange(selectedList)
  }



  return (
    <div style={{
      border: 'solid 2px pink',
      width: '280px',
      display: 'flex',
      flexDirection:"column",
    }}>
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
        value={value ? value.value : undefined}
        defaultValue={defaultValue}
        onChange={(e)=> onChangeLists(e.target.value)}
        style={{
          width: "100%",
          padding:"4px 8px"
        }}
      >
        {Object.keys(lists).map((key,idx)=><option key={idx} value={key} >{lists[key]['label']}</option>)}
      </select>
    </div>
  );
};
