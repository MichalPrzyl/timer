import React, { useEffect } from 'react';
import './Timer.css';
import './Button.css';
import './App.css';


const Button = (props: any) => {

  
  return (
    // <div className='button'>to jest button</div>
    <>
      <div className='btn-container' onClick={props.onClick}>
        <img src={props.img} />
        <div className="btn-label">{props.text}</div>
      </div>

    </>
  )
}

export default Button;
