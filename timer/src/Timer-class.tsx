import React, { useState, useEffect } from 'react';
import './Timer.css'
import './App.css';
import Button from './Button';
import playIcon from './images/play_icon.png';
import pauseIcon from './images/pause_icon.png';
import resetIcon from './images/reset_icon.png';
import { endianness } from 'os';

class Timer extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      abc: 1,
      // to co ustawiamy
      setHours: 0,
      setMinutes: 0,
      setSeconds: 0,
      // realny licznik numbers
      timerHours: 0,
      timerMinutes: 0,
      timerSeconds: 0,
      // wyswietlanie
      timerHoursDisplay: "00",
      timerMinutesDisplay: "00",
      timerSecondsDisplay: "00",
      active: false,
      onceStarted: false,

    }
  }


  end = () => {
    console.log("KONIEC");
  }

  fillZeros = (seconds: any, minutes: any, hours: any) => {

    if (hours < 10) {
      hours = `0${hours}`
    }

    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`
    return { hours: hours, minutes: minutes, seconds: seconds };
  }

  Tick = (hours: number, minutes: number, seconds: number) => {
    if (this.state.active) {
      // seconds = this.state.setSeconds;
      // minutes = this.state.setMinutes;
      // hours = this.state.setHours;
      
      
      if (seconds == 0) {
        if (minutes > 0) {
          seconds = 60;
          minutes -= 1;
        }
        else {
          if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 60;
          }
          else {
            this.end();
            return;
          }
        }
      }
      seconds -= 1;

      const filled = this.fillZeros(seconds, minutes, hours);

      // this.setState({
      //   timerHours: filled.hours,
      //   timerMinutes: filled.minutes, 
      //   timerSeconds: filled.seconds 
      // })
      this.setState({
        timerHours: hours,
        timerMinutes: minutes,
        timerSeconds: seconds,

        timerSecondsDisplay: filled.seconds,
        timerMinutesDisplay: filled.minutes,
        timerHoursDisplay: filled.hours,
      })

    }

    setTimeout(this.Tick, 1000, this.state.timerHours, this.state.timerMinutes, this.state.timerSeconds);

  }

  handleStartButton = () => {
    if (!this.state.active) {
      this.setState({ active: true })
      if (!this.state.onceStarted) {
        this.setState({ onceStarted: true })
        this.Tick(this.state.timerHours, this.state.timerMinutes, this.state.timerSeconds);
      }
    }
  }

  handlePauseButton = () => {
    console.log("Kliknieto PAUSE");
    this.setState({ active: false })
  }

  handleRestartButton = () => {
    console.log("Kliknieto RESTART")
    this.setTimer();
  }

  handleHours = (event: any) => {
    this.setState({ setHours: event.target.value })
    console.log(typeof event.target.value)
  }

  handleMinutes = (event: any) => {
    this.setState({ setMinutes: event.target.value })
    console.log(typeof event.target.value)
  }

  handleSeconds = (event: any) => {
    this.setState({ setSeconds: event.target.value })
  }

  setTimer = () => {
    const trimmed = {
      seconds: parseInt(this.state.setSeconds, 10),
      minutes: parseInt(this.state.setMinutes, 10),
      hours: parseInt(this.state.setHours, 10)
    }
    const { seconds, minutes, hours } = trimmed;
    const filled = this.fillZeros(seconds, minutes, hours);
    this.setState({
      timerHours: hours,
      timerMinutes: minutes,
      timerSeconds: seconds,

      timerSecondsDisplay: filled.seconds,
      timerMinutesDisplay: filled.minutes,
      timerHoursDisplay: filled.hours,
    })
  }

  render() {
    return (
      <div className='container' id="container">
        <div className="header">Tytul</div>
        <div className="main">

          <div className='input-counter'>
            <div>ile</div>
            <input type="text" onChange={this.handleHours}></input>:
            <input type="text" onChange={this.handleMinutes}></input>:
            <input type="text" onChange={this.handleSeconds}></input>
          </div>

          <Button onlyText={true} text="Ustaw" onClick={this.setTimer} />


          <div className="buttons-wrapper">
            <Button img={playIcon} text="start" onClick={this.handleStartButton} />
            <Button img={pauseIcon} text="pauza" onClick={this.handlePauseButton} />
            <Button img={resetIcon} text="restart" onClick={this.handleRestartButton} />
          </div>

          <div className="timer-counter">
            <div>{this.state.timerHoursDisplay}:{this.state.timerMinutesDisplay}:{this.state.timerSecondsDisplay}</div>
          </div>

        </div>
      </div>
    )
  }

}

export default Timer;

