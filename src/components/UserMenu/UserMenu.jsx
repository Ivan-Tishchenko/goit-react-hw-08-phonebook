import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/operations';
import { selectEmail, selectIsLogin } from 'redux/selectors';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const isLogin = useSelector(selectIsLogin);
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    isLogin && (
      <div className={css.div}>
        <p className={css.email}>{userEmail}</p>
        <button
          className={css.button}
          onClick={() => {
            dispatch(logout());
            navigate('/goit-react-hw-08-phonebook/register', { replace: true });
          }}
        >
          Logout
        </button>
      </div>
    )
  );
};

export default UserMenu;
