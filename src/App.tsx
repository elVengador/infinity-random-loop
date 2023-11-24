import "./App.css";
import { useEffect, useState } from "react";
import {
  ENGLISH_ADVANCED_VOCABULARY_LIST,
  ENGLISH_BASIC_VOCABULARY_LIST,
  ENGLISH_INTERMEDIATE_VOCABULARY_LIST,
  NOTE_MUSICAL_LIST,
} from "./constants";
import { Card } from "./components/Card";
import { ListsSelector, Lists } from "./components/ListsSelector";
import { Button } from "./components/Button";

export type SelectedList = {
  label: string;
  value: string;
};

const LISTS: Lists = {
  noteMusical: { value: NOTE_MUSICAL_LIST, label: "Note Musical" },
  englishBasicVocabulary: {
    value: ENGLISH_BASIC_VOCABULARY_LIST,
    label: "English Basic Vocabulary",
  },
  englishIntermediateVocabulary: {
    value: ENGLISH_INTERMEDIATE_VOCABULARY_LIST,
    label: "English Intermediate Vocabulary",
  },
  englishAdvancedVocabulary: {
    value: ENGLISH_ADVANCED_VOCABULARY_LIST,
    label: "English Advanced Vocabulary",
  },
};

const randomValue = (values: string[]): string => {
  const randomIdx = Math.floor(Math.random() * values.length);
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
   * - discommend the add and edit button from AllLists component
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
  const [selectedList, setSelectedList] = useState<SelectedList | null>({
    label: "Note Musical",
    value: "noteMusical",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const intervalId = setInterval(() => {
      if (!selectedList) return console.log("not exist list");

      setRandomCard(randomValue(LISTS[selectedList.value].value));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const backgroundColor = isDarkMode ? "rgb(206,206,206)" : "#1E1E1E";
  const color = isDarkMode ? "#1E1E1E" : "rgb(206,206,206)";
  const backgroundCard = isDarkMode ? "#FBFBFB" : "#6C6C6C";

  return (
    <div
      style={{
        position: "absolute",
        left: "0px",
        top: "0px",
        right: "0px",
        bottom: "0px",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "30px",
        background: backgroundColor,
        color: color,
      }}
    >
      {selectedList && (
        <>
          <Card
            value={randomCard}
            backgroundColor={backgroundCard}
            color={color}
          />
          <Button
            onclick={() => setIsPlaying(!isPlaying)}
            theme={isDarkMode ? "dark" : "light"}
          >
            {isPlaying ? "▣ Stop" : "▶ Play"}
          </Button>
        </>
      )}

      {!selectedList && <p>Select a list please</p>}
      <ListsSelector
        lists={LISTS}
        value={selectedList}
        onChange={setSelectedList}
        backgroundColor={backgroundColor}
        color={color}
      />

      <Button
        onclick={() => setIsDarkMode((visual) => !visual)}
        theme={isDarkMode ? "dark" : "light"}
        style={{
          fontSize: "50px",
          position: "absolute",
          bottom: "40px",
          right: "40px",
        }}
      >
        {isDarkMode === true ? "☾" : "☀"}
      </Button>

      <p
        style={{
          position: "absolute",
          bottom: "10px",
          fontSize: "14px",
        }}
      >
        By elVengador & Lachicagladiadora - 2023
      </p>
    </div>
  );
}

export default App;
