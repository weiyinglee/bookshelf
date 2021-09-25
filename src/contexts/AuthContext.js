import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';

const AuthContext = React.createContext({ token: null });
export const AuthProvider = ({ children }) => {
  const {
    isLoading,
    isAuthenticated,
    getIdTokenClaims,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();
  const [token, setToken] = useState(null);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Authentication error.. {error}</p>
  }

  if (isAuthenticated) {
    getIdTokenClaims().then((t) => {
      setToken(t.__raw);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        token, loginWithRedirect, logout, user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
