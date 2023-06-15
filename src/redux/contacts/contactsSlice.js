import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContacts(state, action) {
      return [...state, action.payload];
    },
    createContacts(state, action) {
      return action.payload;
    },
    deleteContact(state, action) {
      return state.filter(obj => obj.id !== action.payload);
    },
  },
});

export const { addContacts, createContacts, deleteContact } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
