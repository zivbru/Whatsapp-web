import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Contacts from '../Contacts/Contacts';
import Conversations from '../Conversations/Conversations';
import NewConversationModal from '../Modals/NewConversationModal';
import NewContactsModal from '../Modals/NewContactsModal';

const CONVERSATIONS = 'conversations';
const CONTACTS = 'contacts';

const Sidebar = ({ id }) => {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS);
  const [modalOpen, setModalOpen] = useState(false);
  const conversationOpen = activeKey === CONVERSATIONS;

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div style={{ width: '250px' }} className='d-flex flex-column'>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='border-right overflow-auth flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top border-right small'>
          Your Id : <span className='text-muted'>{id}</span>
        </div>
        <Button className='rounded-0' onClick={() => setModalOpen(true)}>
          New {conversationOpen ? 'Conversation' : 'Contacts'}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onHide={closeModal}>
        {conversationOpen ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactsModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
