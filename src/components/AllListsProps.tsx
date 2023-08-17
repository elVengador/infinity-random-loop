import { SelectedList } from "../App";
import { Button } from "./Button";

export type Lists= {[key:string]:{value:string[], label:string}}

type AllListsProps = { 
  lists:Lists
  options:{valueOptList:string,labelOptList:string}[],
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
      border: 'solid 1px white',
      width: '280px',
      display: 'flex',
      flexDirection:"column",
      cursor:'pointer',

    }}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}></div>
      <select
        id=""
        value={value ? value.value : undefined}
        defaultValue={defaultValue}
        onChange={(e)=> onChangeLists(e.target.value)}
        style={{
          width: "100%",
          padding:"8px",
          background: '#1E1E1E',
          fontSize:'16px',
        }}
      >
        {Object.keys(lists).map((key,idx)=><option style={{background: '#1E1E1E'}} key={idx} value={key} >{lists[key]['label']}</option>)}
      </select>
    </div>
  );
};
