/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/operations';
import { getFilter, getContacts } from 'redux/selectors';
import css from './ContactList.module.css';

export const ContactList = props => {
  const filterWord = useSelector(getFilter);
  const allContacts = useSelector(getContacts);
  const [contacts, setContacts] = useState(Object.values(allContacts));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  useEffect(() => {
    if (filterWord.length > 0) {
      setContacts(contactsFilter());
    } else {
      setContacts(allContacts);
    }
  }, [allContacts, filterWord]);

  function contactsFilter() {
    if (filterWord.length === 0) {
      return allContacts;
    }
    return allContacts.filter(
      obj =>
        obj.name.substring(0, filterWord.length).toLowerCase() ===
        filterWord.toLowerCase()
    );
  }

  return (
    <ul className={css.list}>
      {contacts.map(
        obj =>
          obj.id && (
            <li key={obj.id} className={css.contact}>
              {obj.name}: {obj.phone}{' '}
              <button
                onClick={() => dispatch(deleteContact(obj.id))}
                className={css.delete}
              >
                Delete
              </button>
            </li>
          )
      )}
    </ul>
  );
};

ContactList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  remuveFromLocalstorage: PropTypes.func,
};
