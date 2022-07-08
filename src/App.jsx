import { useEffect } from 'react'
import { useState } from 'react'
import { IoPlaySharp, IoPauseSharp, IoReloadSharp } from 'react-icons/io5'

import './App.css'

function App() {
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 })
  const [isRunning, setIsRunning] = useState(false)

  const startTimer = (time) => {
    time.seconds++
    if (time.seconds > 59) {
      time.minutes++
      time.seconds = 0
    }
    if (time.minutes > 59) {
      time.hours++
      time.minutes = 0
    }
    return setTime({
      seconds: time.seconds,
      minutes: time.minutes,
      hours: time.hours,
    })
  }

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        startTimer(time)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className='app'>
      <div className='container'>
        <div className='watch'>
          <span>{time.hours < 10 ? '0' + time.hours : time.hours} : </span>
          <span>
            {time.minutes < 10 ? '0' + time.minutes : time.minutes} :{' '}
          </span>
          <span>{time.seconds < 10 ? '0' + time.seconds : time.seconds}</span>
        </div>
        <div className='control'>
          {!isRunning ? (
            <div className='play' onClick={() => setIsRunning(true)}>
              <IoPlaySharp />
            </div>
          ) : (
            <div className='pause' onClick={() => setIsRunning(false)}>
              <IoPauseSharp />
            </div>
          )}
          <div
            className='reset'
            onClick={() => setTime({ seconds: 0, minutes: 0, hours: 0 })}
          >
            <IoReloadSharp />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
