import React, { useState } from 'react';
import Router from 'components/Router';
import { Layout } from 'components/Layout';
import {getAuth} from 'firebase/auth';
import { app } from 'firebaseApp';

function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser //auth?.currentUser가 존재하면 true, 그렇지 않으면 false
  );
  console.log(auth);

  return (
    <Layout>
      <Router />
    </Layout>
    
  );
}

export default App;
