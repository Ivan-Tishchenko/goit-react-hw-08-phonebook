import React from 'react';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useDispatch } from 'react-redux';
import { createContacts } from 'redux/contacts/contactsSlice';

export const App = props => {
  const dispatch = useDispatch();

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
    dispatch(createContacts(arrayToReturnInLocalstorage));
  }

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addToLocalstorage={addToLocalstorage} />
      </Section>
      <Section title="ContactList">
        <Filter />
        <ContactList
          getFromLocalstorage={getFromLocalstorage}
          remuveFromLocalstorage={remuveFromLocalstorage}
        />
      </Section>
    </>
  );
};
