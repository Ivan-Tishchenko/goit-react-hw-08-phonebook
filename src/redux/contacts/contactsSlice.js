import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from 'redux/operations';

const contactsInitialState = {
  items: [],
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

const STATUS = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const actionGenerators = [fetchContacts, addContact, deleteContact];

const getActionGeneratorsWithType = status =>
  actionGenerators.map(generator => generator[status]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder => {
    builder
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(obj => obj.id !== action.payload.id);
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.PENDING)),
        handlePending
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.FULFILLED)),
        handleFulfilled
      )
      .addMatcher(
        isAnyOf(...getActionGeneratorsWithType(STATUS.REJECTED)),
        handleRejected
      );
  },
});

export const contactsReducer = contactsSlice.reducer;

//rafce
