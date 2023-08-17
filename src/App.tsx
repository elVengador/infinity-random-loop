import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { AllLists, Lists } from "./components/AllListsProps";
import { ENGLISH_ADVANCED_VOCABULARY_LIST, ENGLISH_BASIC_VOCABULARY_LIST, ENGLISH_INTERMEDIATE_VOCABULARY_LIST, NOTE_MUSICAL_LIST } from "./constants";
import { Button } from "./components/Button";

export type SelectedList = {
  label: string,
  value: string
}

const LISTS: Lists = { noteMusical: { value: NOTE_MUSICAL_LIST, label: 'Note Musical' }, englishBasicVocabulary: { value: ENGLISH_BASIC_VOCABULARY_LIST, label: 'English Basic Vocabulary' }, englishIntermediateVocabulary: { value: ENGLISH_INTERMEDIATE_VOCABULARY_LIST, label: 'English Intermediate Vocabulary' }, englishAdvancedVocabulary: { value: ENGLISH_ADVANCED_VOCABULARY_LIST, label: 'English Advanced Vocabulary' } }

const randomValue = (values: string[]): string => {
  const randomIdx = Math.floor(Math.random() * (values.length - 1));
  return values[randomIdx];
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

  useEffect(() => {
    if (!isPlaying) return;
    const intervalId = setInterval(() => {
      // TODO: get new random value
      if (!selectedList) return console.log('not exist list')
     
      setRandomCard(randomValue(lists[selectedList.value].value))
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying]);


  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px'
      }}
    >
      {
        selectedList &&
        <>
          <Card
            value={randomCard}
            backgroundColor={isPlaying ? '3D5468' : "683D3D"}
          />
          <Button 
            onclick={()=>setIsPlaying(!isPlaying)}

          >
            {isPlaying ? "▣ Stop" : "▶ Play"}
          </Button>
        </>
      }

      {!selectedList && <p>Select a list please</p>}
      <AllLists lists={lists} options={[{ labelOptList: "l1", valueOptList: "1" }]} value={selectedList} onChange={setSelectedList} />

      <p
        style={{
          position: 'absolute',
          bottom: '10px',
          fontSize: '14px'
        }}
      >By elVengador & Lachicagladiadora - 2023</p>
    </div>

  );
}

export default App;
