import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import { useConversations } from '../../Context/ConversationProvider';

const Dashboard = ({ id }) => {
  const selectedConversations = useConversations();

  return (
    <div className='d-flex' style={{ height: '100vh' }}>
      <Sidebar id={id} />
      {selectedConversations && <Chat />}
    </div>
  );
};

export default Dashboard;
