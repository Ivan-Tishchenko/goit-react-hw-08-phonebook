import React from 'react';
import { useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { getUserInfo } from 'redux/operations.js';
import { selectToken } from 'redux/selectors.js';
import IsLoading from './IsLoading/IsLoading.jsx';
import Login from './Login/Login.jsx';
import UserMenu from './UserMenu/UserMenu.jsx';

const Section = lazy(() => import('./Section/Section.jsx'));
const ContactForm = lazy(() => import('./ContactForm/ContactForm.jsx'));
const ContactList = lazy(() => import('./ContactList/ContactList.jsx'));
const Filter = lazy(() => import('./Filter/Filter.jsx'));
const Register = lazy(() => import('./Register/Register.jsx'));

const App = props => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getUserInfo(token));
  }, [dispatch, token]);
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UserMenu />
        <Routes>
          <Route path="/goit-react-hw-08-phonebook" element={<IsLoading />} />
          <Route
            path="/goit-react-hw-08-phonebook/register"
            element={
              <Section title="Register">
                <Register />
              </Section>
            }
          />
          <Route
            path="/goit-react-hw-08-phonebook/login"
            element={
              <Section title="Log in">
                <Login />
              </Section>
            }
          />
          <Route
            path="/goit-react-hw-08-phonebook/contacts"
            element={
              <>
                <Section title="Phonebook">
                  <ContactForm />
                </Section>
                <Section title="ContactList">
                  <Filter />
                  <ContactList />
                </Section>
              </>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
