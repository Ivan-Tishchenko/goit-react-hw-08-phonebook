import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectToken } from 'redux/selectors';

const IsLoading = () => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (token) {
      return;
    }
    navigate('/register', { replace: true });
  });

  return <div>Loading...</div>;
};

export default IsLoading;
