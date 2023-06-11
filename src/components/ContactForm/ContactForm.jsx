import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { getContacts } from 'redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts } from 'redux/contacts/contactsSlice';

export const ContactForm = props => {
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const nameImputId = nanoid();
  const telInputId = nanoid();
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const hendleInput = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setUserName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log('undefenit imput was used');
    }
  };

  function handleSubmit(evt, name, number) {
    evt.preventDefault();
    if (
      Object.values(contacts)
        .map(obj => obj.name)
        .includes(name)
    ) {
      alert(`${name} is alredy in ContactList`);
    } else {
      dispatch(
        addContacts({
          name,
          id: nanoid(),
          number,
        })
      );
    }
    evt.currentTarget.reset();
  }

  return (
    <form
      className={css.form}
      onSubmit={evt => handleSubmit(evt, userName, number)}
    >
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
      <label htmlFor={telInputId}>Number</label>
      <input
        onInput={hendleInput}
        id={telInputId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
