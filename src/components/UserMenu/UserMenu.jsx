import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from 'redux/operations';
import { selectEmail, selectIsLogin } from 'redux/selectors';

const UserMenu = () => {
  const isLogin = useSelector(selectIsLogin);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return isLogin ? (
    <div>
      <p>{userEmail}</p>
      <button
        onClick={() => {
          dispatch(logout());
          navigate('/register', { replace: true });
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <>
      <NavLink to="/register">Sign up</NavLink>
      <NavLink to="/login">Log in</NavLink>
    </>
  );
};

export default UserMenu;
