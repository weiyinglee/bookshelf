import React, { useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

export const DataProvider = ({ children }) => {
  const { token, user} = useContext(AuthContext);

  useEffect(() => {
    const registerUser = async () => {
      await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: user.name, email: user.email, userId: user.sub
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    };

    if (token) {
      registerUser();
    }
  }, [user, token]);

  return (
    <div>{children}</div>
  );
};

export default DataProvider;
