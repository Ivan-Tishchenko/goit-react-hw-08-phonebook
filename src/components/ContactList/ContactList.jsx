/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getContacts } from 'redux/selectors';
import { createContacts } from 'redux/contacts/contactsSlice';

export const ContactList = props => {
  const [contacts, setContacts] = useState([]);
  const isMount = useRef();
  const filterWord = useSelector(getFilter);
  const allContacts = useSelector(getContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createContacts(props.getFromLocalstorage()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMount) {
      return;
    }
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
    <ul>
      {contacts.map(obj => (
        <li key={obj.id}>
          {obj.name}: {obj.number}{' '}
          <button onClick={() => props.remuveFromLocalstorage(obj.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  getFromLocalstorage: PropTypes.func,
  remuveFromLocalstorage: PropTypes.func,
};
