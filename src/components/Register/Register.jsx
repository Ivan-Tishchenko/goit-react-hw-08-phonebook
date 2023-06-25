import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { register } from 'redux/operations';
import css from './Register.module.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nameImputId = nanoid();
  const emailInputId = nanoid();
  const passwordId = nanoid();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = evt => {
    evt.preventDefault();

    dispatch(register({ name, email, password }));

    evt.currentTarget.reset();
    navigate('/contacts', { replace: true });
  };

  const hendleInput = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
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
  return (<>
    <form className={css.form} onSubmit={evt => handleSubmit(evt)}>
      <label htmlFor={nameImputId}>Name</label>
      <input
        onInput={hendleInput}
        type="text"
        name="name"
        id={nameImputId}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
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
        Register
      </button>
    </form>
  <NavLink to="/login">have accaunt? log in</NavLink>
  </>
  );
};

export default Register;
