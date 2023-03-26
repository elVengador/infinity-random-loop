import './style.css'

const VALUES = ['DO', 'RE', 'MI', 'FA', 'SOL', 'LA', 'SI']

const getRandomValue = (values) => {
  const randomIdx = Math.floor(Math.random() * (values.length - 1))
  return values[randomIdx]
}

const startApp = () => {
  let intervalId = ""

  const playButtonElement = document.querySelector('#play-button')
  const randomValueElement = document.querySelector('#random-value')

  if (!playButtonElement) return console.error("#play-button doesn't exist")
  if (!randomValueElement) return console.error("#random-value doesn't exist")


  playButtonElement.addEventListener('click', () => {
    if (intervalId) {
      stopLoop()
      playButtonElement.innerHTML = "▶ Play"
      playButtonElement.classList.remove('stop')
    } else {
      startLoop()
      playButtonElement.innerHTML = "▣ Stop"
      playButtonElement.classList.add('stop')
    }
  })

  const startLoop = () => {
    intervalId = setInterval(() => {
      const randomValue = getRandomValue(VALUES)
      if (!randomValue) return console.error('invalid idx to get random value')

      randomValueElement.innerHTML = randomValue
    }, 1000)
  }

  const stopLoop = () => {
    clearInterval(intervalId)
    intervalId = ""
  }
}

startApp()