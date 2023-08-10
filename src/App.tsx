import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { AllLists, Lists } from "./components/AllListsProps";
import { ENGLISH_BASIC_VOCABULARY_LIST, NOTE_MUSICAL_LIST } from "./constants";

export type SelectedList = {
  label: string,
  value: string
}

const LISTS: Lists = { noteMusical: { value: NOTE_MUSICAL_LIST, label: 'Note Musical' }, englishBasicVocabulary: { value: ENGLISH_BASIC_VOCABULARY_LIST, label: 'English Basic Vocabulary' } }
// console.log(lists)

const randomValue = (values: string[]): string => {
  const randomIdx = Math.floor(Math.random() * (values.length - 1));
  return values[randomIdx];
};

const randomColor = () => {
  const rColor = Math.floor(Math.random() * 255);
  const gColor = Math.floor(Math.random() * 255);
  const bColor = Math.floor(Math.random() * 255);
  return `rgb(${rColor}, ${gColor}, ${bColor})`;
};

function App() {
  /**
   * TODO: 
   * - create selectedList state with type <{{label:string,value:string}}> 
   * - create a object lists = { nameOfList1: [...hereDestructureTheListFromConstant], nameOfList2:[], ...}
   * - add the click event on the <option/> Html element to change the selectedList
   * - use the selected list to generate a the random value
   * - create a PR
   * 
   * TODO:
   * - descoment the add and edit button from AllLists component
   * - create a state displayListForm
   * - create a Modal with position absolute and display if displayListForm is True
   * - send {data:{title:string,list:selectedList},isNew:boolean} to the Modal
   * - when create a new List isNew=false and data:{title:"",data:[]}
   * - when edit a list isNew=true and data: {title:"the title of the list",data:selectedList}
   * - add a button on the modal with "Save" text, when clicks on this button should add the object lists with the title as key and data as the value, then close the modal
   * - similar to edit
   * - create PR
   */
  const [randomCard, setRandomCard] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedList, setSelectedList] = useState<SelectedList | null>(null);
  const [lists, setLists] = useState(LISTS)
  // console

  useEffect(() => {
    if (!isPlaying) return;
    const intervalId = setInterval(() => {
      // TODO: get new random value
      if(!selectedList) return console.log('not exist list')
      // console.log(lists)
      // console.log(selectedList)
      // console.log(lists[selectedList.value].value)
      setRandomCard(randomValue(lists[selectedList.value].value))
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying]);


  return (
    <div>
      {
        selectedList &&
        <>
          <Card
            listTitle={selectedList.label}
            value={randomCard}
            color={isPlaying ? randomColor() : "rgb(42, 42, 42)"}
          />
          <button
            className={isPlaying ? "stop-button" : "play-button"}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? "▣ Stop" : "▶ Play"}
          </button>
        </>
      }

      {!selectedList && <p>select a list please</p>}
      <AllLists lists={lists} options={[{ label: "l1", value: "1" }]} value={selectedList} onChange={setSelectedList} />

    </div>
  );
}

export default App;
