import { SelectedList } from "../App";
import { Button } from "./Button";

export type Lists= {[key:string]:{value:string[], label:string}}

type AllListsProps = { 
  lists:Lists
  options:{valueOptList:string,labelOptList:string}[],
  value: SelectedList | null, 
  onChange: (value:SelectedList | null)=> void
  backgroundColor: string,
  color: string,
  defaultValue?: string,
 };


 export const AllLists = ({ lists, options, value, defaultValue, onChange, backgroundColor, color }: AllListsProps) => {
   const onChangeLists = (value:string)=> {
    const titleList = lists[value] 
    if(!titleList)return
    
    const selectedList:SelectedList = {value, label: titleList.label}
    onChange(selectedList)
  }



  return (
    <div style={{
      border: `solid 1px ${color}`,
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
          background: backgroundColor ,
          fontSize:'16px',
          color: color,
        }}
      >
        {Object.keys(lists).map((key,idx)=><option style={{background: backgroundColor, color: color, }} key={idx} value={key} >{lists[key]['label']}</option>)}
      </select>
    </div>
  );
};
