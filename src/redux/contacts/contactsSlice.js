import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';

const contactsInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: {
    [fetchContacts.pending](state) {
      handlePending(state);
    },
    [fetchContacts.fulfilled](state, action) {
      handleFulfilled(state, action);
      state.contacts = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      handleRejected(state, action);
    },
    [deleteContact.pending](state) {
      handlePending(state);
    },
    [deleteContact.fulfilled](state, action) {
      handleFulfilled(state, action);
      state.contacts = state.contacts.filter(
        obj => obj.id !== action.payload.id
      );
    },
    [deleteContact.rejected](state, action) {
      handleRejected(state, action);
    },
    [addContact.pending](state) {
      handlePending(state);
    },
    [addContact.fulfilled](state, action) {
      handleFulfilled(state, action);
      state.contacts.push(action.payload);
    },
    [addContact.rejected](state, action) {
      handleRejected(state, action);
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
