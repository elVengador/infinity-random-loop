import { useEffect, useState } from 'react'
import './App.css'


const noteMusical:string[] = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']

const randomValue = (values:string[]):string => {
  const randomIdx = Math.floor(Math.random() * (values.length - 1))
  return values[randomIdx]
}

function App() {
  const [randomNote, setRandomNote] = useState(noteMusical[0])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if(!isPlaying) return
    const intervalId = setInterval(() => {
      setRandomNote(randomValue(noteMusical))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isPlaying])

  function changeButton(){
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <p className='random-note'>
        {randomNote}
      </p>
      <button className={isPlaying ? 'stop-button' : 'play-button'} onClick={changeButton}>
        {isPlaying ? '▣ Stop' : '▶ Play'}
      </button>
    </>
  )
}

export default App
