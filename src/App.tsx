import "./App.css";
import { useEffect, useState } from "react";
import {
  ENGLISH_ADVANCED_VOCABULARY_LIST,
  ENGLISH_BASIC_VOCABULARY_LIST,
  ENGLISH_INTERMEDIATE_VOCABULARY_LIST,
  NOTE_MUSICAL_LIST,
  BASIC_CHORDS,
} from "./constants";
import { Card } from "./components/Card";
import { ListsSelector, Lists } from "./components/ListsSelector";
import { Button } from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faPause,
  faPlay,
  faRunning,
  faSun,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { narrateText } from "./helpers";
import { SpeedInput } from "./components/SpeedInput";

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
  basicChords: {
    value: BASIC_CHORDS,
    label: "Basic Chords",
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
  const [canNarrate, setCanNarrate] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [displaySpeedController, setDisplaySpeedController] = useState(false)

  useEffect(() => {
    if (!isPlaying) return;
    if (!selectedList) return;
    const intervalId = setInterval(() => {
      const newRandomValue = randomValue(LISTS[selectedList.value].value);
      setRandomCard(newRandomValue);
      if (canNarrate) narrateText(newRandomValue.toLowerCase());
    }, speed);
    return () => clearInterval(intervalId);
  }, [canNarrate, isPlaying, selectedList, speed]);

  const backgroundColor = isDarkMode ? "rgb(206,206,206)" : "#1E1E1E";
  const color = isDarkMode ? "#1E1E1E" : "rgb(206,206,206)";
  const backgroundCard = isDarkMode ? "#FBFBFB" : "#6C6C6C";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows: "50px 1fr 30px",
        gridTemplateColumns: "1fr",
        background: backgroundColor,
        color: color,
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
          padding: "4px 8px",
        }}
      >
        <h1 style={{ fontSize: "20px", textAlign: "center", margin: "0px" }}>
          Infinity Random Loop
        </h1>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Button
            onclick={() => setIsDarkMode((visual) => !visual)}
            theme={isDarkMode ? "dark" : "light"}
            style={{ padding: "0px", width: "36px", height: "36px" }}
            title={
              isDarkMode ? "Change to light theme" : "Change to dark theme"
            }
          >
            {isDarkMode ? (
              <FontAwesomeIcon icon={faMoon} size="xs" />
            ) : (
              <FontAwesomeIcon icon={faSun} size="xs" />
            )}
          </Button>
          <Button
            onclick={() => setCanNarrate((prev) => !prev)}
            theme={isDarkMode ? "dark" : "light"}
            title={canNarrate ? "Disable narrator" : "Enable narrator"}
            style={{ padding: "0px", width: "36px", height: "36px" }}
          >
            {canNarrate ? (
              <FontAwesomeIcon icon={faVolumeUp} size="xs" />
            ) : (
              <FontAwesomeIcon icon={faVolumeMute} size="xs" />
            )}
          </Button>
        </section>
      </header>

      <main
        style={{
          padding: "4px 8px",
          position: "relative",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* cards */}
        <section
          style={{
            width: "100%",
            height: "100%",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {selectedList && (
            <Card
              value={randomCard}
              backgroundColor={backgroundCard}
              color={color}
              style={{ maxWidth: "500px", maxHeight: "300px" }}
            />
          )}

          {!selectedList && <p>Select a list please</p>}

          {/* controls */}
          <div
            style={{
              maxWidth: "400px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "12px",
              alignItems: "center",
            }}
          >
            <Button
              onclick={() => setDisplaySpeedController(prev=>!prev)}
              theme={isDarkMode ? "dark" : "light"}
              title={"More Options"}
              style={{ width: "36px", height: "36px", padding: "0px",color:displaySpeedController?"#3d9eff":"inherit" }}
            >
              {/* <FontAwesomeIcon icon={faGear} size="xs" /> */}
              <FontAwesomeIcon icon={faRunning} size="xs" />
            </Button>
            <ListsSelector
              lists={LISTS}
              value={selectedList}
              onChange={setSelectedList}
              backgroundColor={backgroundColor}
              color={color}
            />
            <Button
              onclick={() => setIsPlaying(prev=>!prev)}
              theme={isDarkMode ? "dark" : "light"}
              title={isPlaying ? "Stop loop" : "Play loop"}
              style={{ width: "36px", height: "36px", padding: "0px" }}
            >
              {isPlaying ? (
                <FontAwesomeIcon icon={faPause} size="xs" />
              ) : (
                <FontAwesomeIcon icon={faPlay} size="xs" />
              )}
            </Button>
          </div>
          {/* other controls */}
          <div style={{width:"100%",maxWidth:"300px",minHeight:"40px"}}>
          {displaySpeedController &&<SpeedInput speed={speed} setSpeed={setSpeed} />}
          </div>
        </section>
      </main>

      <footer
        style={{
          padding: "4px 8px",
          display: "grid",
          placeItems: "center",
          maxWidth: "1000px",
          width: "100%",
          margin: "0px auto",
        }}
      >
        By elVengador & Lachicagladiadora - 2023
      </footer>
    </div>
  );
}

export default App;
