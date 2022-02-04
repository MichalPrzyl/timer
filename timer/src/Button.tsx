import React, { useEffect } from 'react';
import './Timer.css';
import './Button.css';
import './App.css';


const Button = (props: any) => {

  
  return (
    <>
      {props.onlyText ? 
      <div onClick={props.onClick} className="btn-border">{props.text}</div> : 
      (<div className={`btn-container ${props.active ? 'active-shadow' : null}`} onClick={props.onClick}>
        <img src={props.img} />
        <div className="btn-label">{props.text}</div>
      </div>)}
      
      

    </>
  )
}

export default Button;
