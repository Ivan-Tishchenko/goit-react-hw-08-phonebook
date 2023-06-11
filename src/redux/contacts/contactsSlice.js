import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsInitialState = [
  {
    id: '1',
    name: 'vati',
    number: '+380667361804',
  },
];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContacts(state, action) {
      return [...Object.values(state), action.payload];
    },
    createContacts(state, action) {
      return action.payload;
    },
    deleteContact(state, action) {
      return Object.values(state).filter(obj => obj.id !== action.payload);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

export const { addContacts, createContacts, deleteContact } =
  contactsSlice.actions;
export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
