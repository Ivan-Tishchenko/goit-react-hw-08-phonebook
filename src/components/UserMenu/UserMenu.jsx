import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from 'redux/operations';
import { selectEmail, selectIsLogin } from 'redux/selectors';

const UserMenu = () => {
  const isLogin = useSelector(selectIsLogin);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();

  return isLogin ? (
    <div>
      <p>{userEmail}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  ) : (
    <>
      <NavLink to="/register">Sign up</NavLink>
      <NavLink to="/login">Log in</NavLink>
    </>
  );
};

export default UserMenu;
