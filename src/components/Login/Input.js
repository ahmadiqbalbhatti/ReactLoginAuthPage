import classes from "./Login.module.css";
import React from "react";

const Input = (props) => {
  return (<div
          className={`${classes.control} ${props.emailIsValid === false ? classes.invalid : ''}`}
      >
        <label htmlFor="email">{props.inputField}</label>
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
      </div>)
}

export default Input;
