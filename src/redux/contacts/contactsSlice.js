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
  },
});

export const { addContacts, createContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
