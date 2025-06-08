import React, { createContext, useContext } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    throw new Error('Auth0 domain and client ID must be provided in environment variables');
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <AuthContextProvider>{children}</AuthContextProvider>
    </Auth0Provider>
  );
};

const AuthContextProvider = ({ children }) => {
  const auth0 = useAuth0();

  return (
    <AuthContext.Provider value={auth0}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};