export const selectContacts = state => state.contacts.items;

export const selectFilter = state => state.filter;

export const selectEmail = state => state.user.email;

export const selectIsLogin = state => state.user.isLogin;

export const selectToken = state => state.user.token;