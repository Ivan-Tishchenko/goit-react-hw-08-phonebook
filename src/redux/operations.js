import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const register = createAsyncThunk(
  'user/register',
  async (userData, API) => {
    try {
      const response = await axios.post('/users/signup', userData);
      token.set(response.data.token);
      return response.data;
    } catch (e) {
      console.log(e.message);
      return API.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk('user/login', async (userData, API) => {
  try {
    const response = await axios.post('/users/login', userData);
    token.set(response.data.token);
    return response.data;
  } catch (e) {
    console.log(e);
    return API.rejectWithValue(e.message);
  }
});

export const logout = createAsyncThunk('user/logout', async (_, API) => {
  try {
    const response = await axios.post('/users/logout');
    token.unset();
    return response.data;
  } catch (e) {
    console.log(e);
    return API.rejectWithValue(e.message);
  }
});

export const getUserInfo = createAsyncThunk(
  'user/getInfo',
  async (currentToken, API) => {
    try {
      token.set(currentToken);
      const response = await axios.get('/users/current');
      return response.data;
    } catch (e) {
      console.log(e);
      return API.rejectWithValue(e.message);
    }
  }
);

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, API) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return API.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, API) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e) {
      return API.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async (contact, API) => {
    try {
      const response = await axios.post(`/contacts`, contact);
      return response.data;
    } catch (error) {
      return API.rejectWithValue(error.message);
    }
  }
);
