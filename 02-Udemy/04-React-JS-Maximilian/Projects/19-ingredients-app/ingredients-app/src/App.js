import React, { Fragment, useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./context/AuthContext";

const App = (props) => {
  const authCtx = useContext(AuthContext);

  let content = <Auth />;
  if (authCtx.isLoggedIn) {
    content = <Ingredients />;
  }
  return content;
};

export default App;
