import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';

export const ContactList = props => {
  const [contacts, setContacts] = useState([]);
  const isMount = useRef();

  useEffect(() => {
    setContacts(props.getFromLocalstorage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMount) {
      return;
    }
    setContacts(props.contacts);
  }, [props.contacts]);

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
