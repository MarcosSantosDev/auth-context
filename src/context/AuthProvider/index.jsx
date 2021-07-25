import { useReducer } from "react";

import data from "./data";
import reducer from "./reducer";
import { AuthContext } from "./context";

const AuthProvider = ({ children }) => {
  const [authState, dispatchAuthState] = useReducer(reducer, data);

  return (
    <AuthContext.Provider value={{ authState, dispatchAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
