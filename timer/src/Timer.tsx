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

  const Tick = () =>{
    // if(start){
      state.timerSeconds -= 1;
      console.log(state.timerSeconds);
      setTimeout(Tick, 1000, true);
    // }
  }



  const handleStartButton = () =>{
    setState(prevState => {
      return { ...prevState, timerHours: state.hours, timerMinutes : state.minutes, timerSeconds: state.seconds }
    })
    setTimeout(Tick, 500, true);
    // Tick(true);
  }

  const handlePauseButton = () =>{
    console.log("Kliknieto PAUSE")
    
  }

  const handleRestartButton = () =>{
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

