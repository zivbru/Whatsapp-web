import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from '../../Context/ContactProvider';
import { useConversations } from '../../Context/ConversationProvider';

const NewConversationModal = ({ closeModal }) => {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedContactsIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => {
          return id === prevId;
        });
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactsIds);
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton> Create Coversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type='checkbox'
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
