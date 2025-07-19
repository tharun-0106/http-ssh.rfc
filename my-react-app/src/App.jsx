import React, { useState } from 'react';
import Login from './login.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <Login></Login>
    </>

  );
}

export default App;
