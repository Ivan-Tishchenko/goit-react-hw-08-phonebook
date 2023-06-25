import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filter/filterSlice';
import { contactsReducer } from './contacts/contactsSlice';
import { userReducer } from './user/userSlice';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // ignoredActionPaths: [
        //   'payload.headers',
        //   'payload.config.transformRequest.0',
        // ],
      },
    }),
});

export const persistor = persistStore(store);
