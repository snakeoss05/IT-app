import React from "react";

import Dashboarde from "./dashboard";

import Login from "./Pages/Login.js";

import { useUser } from "./context/user.js";

function App() {
  const { UserLog } = useUser();

  return <>{UserLog ? <Dashboarde /> : <Login />}</>;
}

export default App;
