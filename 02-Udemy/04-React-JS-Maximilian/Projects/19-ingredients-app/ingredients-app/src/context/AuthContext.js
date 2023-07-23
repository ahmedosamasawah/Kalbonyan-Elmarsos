import React, { useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setAuth] = useState(false);

  const loginHandler = () => {
    setAuth(true);
  };

  return (
    <AuthContext.Provider value={{ login: loginHandler, isLoggedIn: isAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
