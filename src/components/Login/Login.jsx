import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from 'redux/operations';
import css from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailInputId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = evt => {
    evt.preventDefault();

    dispatch(login({ email, password }));

    evt.currentTarget.reset();
    navigate('/goit-react-hw-08-phonebook/contacts', { replace: true });
  };

  const hendleInput = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        console.log('undefenit imput was used');
    }
  };
  return (
    <>
      <form className={css.form} onSubmit={evt => handleSubmit(evt)}>
        <label htmlFor={emailInputId}>Email</label>
        <input
          onInput={hendleInput}
          id={emailInputId}
          type="email"
          name="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          title="Email must contain @"
          required
        />
        <label htmlFor={passwordId}>Password</label>
        <input
          onInput={hendleInput}
          id={passwordId}
          type="password"
          name="password"
          pattern=".{8,}"
          required
          title="Password must contain 8 or more characters"
        />
        <button className={css.button} type="submit">
          Login
        </button>
      </form>
      <NavLink to="/goit-react-hw-08-phonebook/register">
        havent accaunt? sign up
      </NavLink>
    </>
  );
};

export default Login;
