import React from 'react';
import UseLocalStorage from './Hooks/UseLocalStorage';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { ContactProvider } from './Context/ContactProvider';
import { ConversationProvider } from './Context/ConversationProvider';
import { SocketProvider } from './Context/SocketProvider';

const App = () => {
  const [id, setId] = UseLocalStorage('id');

  const dashboard = (
    <SocketProvider id={id}>
      <ContactProvider>
        <ConversationProvider id={id}>
          <Dashboard id={id} />
        </ConversationProvider>
      </ContactProvider>
    </SocketProvider>
  );

  return (
    <div className='App'>
      <>{id ? dashboard : <Login onIdSubmit={setId} />}</>
    </div>
  );
};

export default App;
