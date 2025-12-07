import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ childern }) => {
  const [user, setUser] = useState();
  const authInfo = {
    user,
  };
  return <AuthContext value={authInfo}>{childern}</AuthContext>;
};

export default AuthProvider;
