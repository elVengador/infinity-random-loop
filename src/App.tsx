import {  useEffect, useState } from 'react'
import './App.css'
import { Card } from './components/Card'
import { List } from './components/List'
import { AllLists } from './components/AllListsProps'


// const noteMusical:string[] = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']
const superList={'noteMusical': ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI'], 'words': ['hello', 'before', 'also', 'tricky', 'indeed']}

const randomValue = (values:string[]):string => {
  const randomIdx = Math.floor(Math.random() * (values.length - 1))
  return values[randomIdx]
}

const randomColor = () => {
  const rColor = Math.floor(Math.random()*255)
  const gColor = Math.floor(Math.random()*255)
  const bColor = Math.floor(Math.random()*255)
  return (`rgb(${rColor}, ${gColor}, ${bColor})`)
}
// console.log(randomColor())
const list = (Object.keys(superList))
// console.log(list)

const visibilityList = (): void => {
// const list = (Object.keys(superList))
list.forEach(element => element)
// console.log(element)
}
console.log(visibilityList())

function App() {
  const [randomCard, setRandomCard] = useState(superList.words[0])
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if(!isPlaying) return
    const intervalId = setInterval(() => {
      setRandomCard(randomValue(superList.words))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [isPlaying])

  function changeButton(){
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      <Card title={(Object.keys(superList)[1]).toUpperCase()} children={randomCard} color={isPlaying ? randomColor() : 'rgb(42, 42, 42)'}  />
      <button className={isPlaying ? 'stop-button' : 'play-button'} onClick={changeButton}>
        {isPlaying ? '▣ Stop' : '▶ Play'}
      </button>
      <div
      style={{
        border: 'solid 2px red',
        width: '280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}      
      >
      <AllLists>
      <List list={(Object.keys(superList)[1]).toLocaleLowerCase()} />
      </AllLists>
      </div>
    </>
  )
}

export default App
