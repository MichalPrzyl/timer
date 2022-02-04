import React, { useState, useEffect } from 'react';
import './Timer.css'
import './App.css';
import Button from './Button';
import playIcon from './images/play_icon.png';
import pauseIcon from './images/pause_icon.png';
import resetIcon from './images/reset_icon.png';

class Timer extends React.Component<any, any> {
  baseState: any;
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
      paused: false,
      onceStarted: false,
      finish: false
    }
    this.baseState = this.state;
  }

  reaguj = (event: any) => {

    if (event.key == "Enter") {
      event.target.blur();
      this.setTimer();
    }

  }

  componentDidMount() {
    console.log("witam")
    document.getElementById('first-input')?.addEventListener("keydown", this.reaguj);
    document.getElementById('second-input')?.addEventListener("keydown", this.reaguj);
    document.getElementById('third-input')?.addEventListener("keydown", this.reaguj);
  }
  end = () => {
    this.setState({ finish: true })
  }

  fillZeros = (seconds: any, minutes: any, hours: any) => {

    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`
    return { hours: hours, minutes: minutes, seconds: seconds };
  }

  Tick = (hours: number, minutes: number, seconds: number) => {
    if (this.state.active) {

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
    this.setState({ paused: false })
  }

  handlePauseButton = () => {
    this.setState({
      active: false,
      paused: true
    })
  }

  handleRestartButton = () => {

    this.setState({
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
      finish: false,
      paused: false
    })
  }

  handleHours = (event: any) => {
    this.setState({ setHours: event.target.value })
  }

  handleMinutes = (event: any) => {
    this.setState({ setMinutes: event.target.value })
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
      active: false,
      timerHours: hours,
      timerMinutes: minutes,
      timerSeconds: seconds,

      timerSecondsDisplay: filled.seconds,
      timerMinutesDisplay: filled.minutes,
      timerHoursDisplay: filled.hours,
    })
  }

  resetInputs = () => {
    this.setState({
      setHours: 0,
      setMinutes: 0,
      setSeconds: 0,
    })
  }

  render() {
    return (
      <div className='container' id="container">

        <div className="header">
          <input type="text" id="title-input" placeholder='Wpisz tytuł'></input>
        </div>

        <div className={`main ${this.state.finish ? 'finished-task' : null}`}>
          <div className='input-counter'>
            <div className="input-counter-element input-counter-element-first">Długość</div>
            <div className="input-counter-element inputs-wrapper">
              <input id="first-input" type="text" onChange={this.handleHours} value={this.state.setHours}></input>:
              <input id="second-input" type="text" onChange={this.handleMinutes} value={this.state.setMinutes}></input>:
              <input id="third-input" type="text" onChange={this.handleSeconds} value={this.state.setSeconds}></input>
            </div>
            <div className="input-counter-element">
              <div className='rst-btn' onClick={this.resetInputs}>Reset</div>
            </div>
          </div>

          <Button onlyText={true} text="Ustaw" onClick={this.setTimer} />


          <div className="buttons-wrapper">
            <Button active={this.state.active} img={playIcon} text="start" onClick={this.handleStartButton} />
            <Button active={this.state.paused} img={pauseIcon} text="pauza" onClick={this.handlePauseButton} />
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
// finished-task
