/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter, getContacts } from 'redux/selectors';
import { deleteContact } from 'redux/contacts/contactsSlice';

export const ContactList = props => {
  const isMount = useRef();
  const filterWord = useSelector(getFilter);
  const allContacts = useSelector(getContacts);
  const [contacts, setContacts] = useState(Object.values(allContacts));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isMount) {
      console.log('qwe');
    }
    if (filterWord.length > 0) {
      setContacts(contactsFilter());
    } else {
      setContacts(Object.values(allContacts));
    }
  }, [allContacts, filterWord]);

  function contactsFilter() {
    if (filterWord.length === 0) {
      return allContacts;
    }
    return Object.values(allContacts).filter(
      obj =>
        obj.name.substring(0, filterWord.length).toLowerCase() ===
        filterWord.toLowerCase()
    );
  }

  return (
    <ul>
      {contacts.map(
        obj =>
          obj.id && (
            <li key={obj.id}>
              {obj.name}: {obj.number}{' '}
              <button onClick={() => dispatch(deleteContact(obj.id))}>X</button>
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
