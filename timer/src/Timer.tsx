import React, { useState, useEffect } from 'react';
import './Timer.css'
import './App.css';
import Button from './Button';
import playIcon from './images/play_icon.png';
import pauseIcon from './images/pause_icon.png';
import resetIcon from './images/reset_icon.png';

const Timer = () => {

  const [state, setState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    timerHours: 0,
    timerMinutes: 0,
    timerSeconds: 0
  });
  // const [globalActive, setGlobalActive] = useState(false as boolean);
  const [globalActive, setGlobalActive] = useState(false);

  const end = () => {
    console.log("KONIEC");
  }
  const fillZeros = (seconds: any, minutes: any, hours: any) => {
    if (hours < 10 && hours > 0) hours = `0${hours}`
    if (minutes < 10 && hours > 0) minutes = `0${minutes}`
    if (seconds < 10 && hours > 0) seconds = `0${seconds}`
    return { hours: hours, minutes: minutes, seconds: seconds };
  }

  const Tick = (hours: number, minutes: number, seconds: number) => {
    // console.log(globalActive)
    if (globalActive) {

      if (seconds == 0) {
        if (minutes > 0) {
          seconds = 59;
          minutes -= 1;
        }
        else {
          if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          }
          else {
            end();
            return;
          }
        }
      }

      seconds -= 1;
      console.log("TU NIE MA NIC")
      const filled = fillZeros(seconds, minutes, hours);
      setState(prevState =>
        ({ ...prevState, timerHours: filled.hours, timerMinutes: filled.minutes, timerSeconds: filled.seconds })
      )
    }
    console.log("Wywolanie pownowne")
    // console.log(globalActive)
    setTimeout(Tick, 1000, hours, minutes, seconds);

  }

  const handleStartButton = () => {
    console.log(globalActive)
    if (!globalActive) {
      console.log("WSZEDLEM W HANDLE START BUTTON")
      // setInterval(Tick, 1000, state.timerHours, state.timerMinutes, state.timerSeconds);
      setGlobalActive(true);
      // setState(prevState => {
      //   return { ...prevState, hehe: true }
      // })
      Tick(state.timerHours, state.timerMinutes, state.timerSeconds);
    }
  }

  const handlePauseButton = () => {
    console.log("Kliknieto PAUSE");
    // setGlobalActive(false);
    Tick(state.timerHours, state.timerMinutes, state.timerSeconds);

  }

  const handleRestartButton = () => {
    console.log("Kliknieto RESTART")
  }

  const handleHours = (event: any) => {
    setState(prevState => {
      return { ...prevState, hours: event.target.value }
    })
  }

  const handleMinutes = (event: any) => {
    setState(prevState => {
      return { ...prevState, minutes: event.target.value }
    })
  }

  const handleSeconds = (event: any) => {
    setState(prevState => {
      return { ...prevState, seconds: event.target.value }
    })
  }

  const setTimer = () => {
    setState(prevState => {
      return { ...prevState, timerHours: state.hours, timerMinutes: state.minutes, timerSeconds: state.seconds }
    })
  }

  return (
    <div className='container' id="container">
      <div className="header">Tytul</div>
      <div className="main">

        <div className='input-counter'>
          <div>ile</div>
          <input type="text" onChange={handleHours}></input>:
          <input type="text" onChange={handleMinutes}></input>:
          <input type="text" onChange={handleSeconds}></input>
        </div>

        <Button onlyText={true} text="Ustaw" onClick={setTimer} />

        <div className="buttons-wrapper">
          <Button img={playIcon} text="start" onClick={handleStartButton} />
          <Button img={pauseIcon} text="pauza" onClick={handlePauseButton} />
          <Button img={resetIcon} text="restart" onClick={handleRestartButton} />
        </div>

        <div className="timer-counter">
          <div>{state.timerHours}:{state.timerMinutes}:{state.timerSeconds}</div>
        </div>

      </div>
    </div>
  )
}

export default Timer;

