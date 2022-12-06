import React, {useContext, useEffect, useReducer, useState} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../context/auth-context";
import Input from "./Input";

const emailReducer = (preState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      // this will use action
      value: action.targetValue,
      isValid: action.targetValue.includes('@'),
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      // else if, must use previous state
      value: preState.value,
      isValid: preState.value.includes('@'),
    }
  }
  return {
    value: '',
    isValid: false,
  }
}

const passwordReducer = (previousState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.targetValue,
      isValid: action.targetValue.trim().length > 6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: previousState.value,
      isValid: previousState.value.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const authContext = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;


  useEffect(() => {
    const timeIdentifier = setTimeout(() => {
      console.log("Form Validity!")
      setFormIsValid(
          emailState.isValid && passwordState.isValid
      );
    }, 250)
    // Clean up function
    return () => {
      console.log("Clean UP")
      clearTimeout(timeIdentifier);
    };

  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);

    dispatchEmail({
      type: 'USER_INPUT',
      targetValue: event.target.value,
    });
    // setFormIsValid(
    //     emailState.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: 'USER_INPUT',
      targetValue: event.target.value,
    });
    // setFormIsValid(
    //     emailState.isValid && passwordState.value.trim().length > 6
    // );


  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({
      type: 'INPUT_BLUR'
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({
      type: 'INPUT_BLUR'
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <Input emailIsValid={emailState.isValid} inputField={'E-Mail'} htmlFor={'email'} type={'email'}
                 id={'email'}
                 value={emailState.value}
                 onChange={emailChangeHandler}
                 onBlur={validateEmailHandler}/>
          <Input emailIsValid={passwordState.isValid} inputField={'Password'} htmlFor={'password'}
                 type={'password'} id={'password'}
                 value={passwordState.value}
                 onChange={passwordChangeHandler}
                 onBlur={validatePasswordHandler}/>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
      </Card>
  );
};

export default Login;
