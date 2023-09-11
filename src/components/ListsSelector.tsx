import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectedList } from "../App";
import { Button } from "./Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export type Lists= {[key:string]:{value:string[], label:string}}

type ListsSelectorProps = { 
  lists:Lists 
  value: SelectedList | null, 
  onChange: (value:SelectedList | null)=> void
  backgroundColor: string,
  color: string,
  onAddList: ()=>void,
  onDelete?: ()=>void,
  defaultValue?: string,
 };


 export const ListsSelector = ({ lists, value, defaultValue, onChange, backgroundColor, color, onAddList}: ListsSelectorProps) => {
   const onChangeLists = (value:string)=> {
    const titleList = lists[value] 
    if(!titleList)return
    
    const selectedList:SelectedList = {value, label: titleList.label}
    onChange(selectedList)
  }



  return (
    <div style={{
      width: '280px',
      display: 'flex',
      flexDirection:"row",
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
      <Button onClick={onAddList} color={color}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
};
