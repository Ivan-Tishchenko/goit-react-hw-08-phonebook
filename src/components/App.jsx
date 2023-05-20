import React, { useState } from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = props => {
  const [contacts, setContacts] = useState(getFromLocalstorage());
  const [filterWord, setFilterWord] = useState('');

  function handleSubmit(evt, name, number) {
    evt.preventDefault();
    if (contacts.map(obj => obj.name).includes(name)) {
      alert(`${name} is alredy in ContactList`);
    } else {
      setContacts([
        ...contacts,
        ...[
          {
            name,
            id: nanoid(),
            number,
          },
        ],
      ]);
    }
    evt.currentTarget.reset();
    addToLocalstorage([
      ...contacts,
      {
        name,
        id: nanoid(),
        number,
      },
    ]);
  }

  function addToLocalstorage(array) {
    const data = JSON.stringify(array);
    localStorage.setItem(`contacts`, data);
  }

  function getFromLocalstorage() {
    const dataJSON = localStorage.getItem(`contacts`);
    const localData = JSON.parse(dataJSON);
    return localData ? localData : [];
  }

  function remuveFromLocalstorage(id) {
    const data = getFromLocalstorage();
    const arrayToReturnInLocalstorage = data.filter(obj => obj.id !== id);
    addToLocalstorage(arrayToReturnInLocalstorage);
    setContacts(arrayToReturnInLocalstorage);
  }

  function handleInput({ currentTarget: { name, value } }) {
    setFilterWord(value.trim());
  }

  function contactsFilter() {
    if (filterWord.length === 0) {
      return contacts;
    }
    return contacts.filter(
      obj =>
        obj.name.substring(0, filterWord.length).toLowerCase() ===
        filterWord.toLowerCase()
    );
  }
  return (
    <>
      <Section title="Phonebook">
        <ContactForm handleSubmit={handleSubmit} />
      </Section>
      <Section title="ContactList">
        <Filter handleInput={handleInput} />
        <ContactList
          contacts={contactsFilter()}
          getFromLocalstorage={getFromLocalstorage}
          remuveFromLocalstorage={remuveFromLocalstorage}
        />
      </Section>
    </>
  );
};
