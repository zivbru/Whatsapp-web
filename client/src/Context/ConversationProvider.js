import React, { useContext, useState, useEffect, useCallback } from 'react';
import UseLocalStorage from '../Hooks/UseLocalStorage';
import { useContacts } from './ContactProvider';
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationContext);
};

export const ConversationProvider = ({ id, children }) => {
  const [conversations, setConversations] = UseLocalStorage(
    'conversations',
    []
  );

  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const { contacts } = useContacts();

  const socket = useSocket();

  const createConversation = (recipients) => {
    setConversations((prev) => {
      return [...prev, { recipients, messages: [] }];
    });
  };
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((rec) => {
      const contact = contacts.find((contact) => {
        return contact.id === rec;
      });

      const name = (contact && contact.name) || rec;
      return { id: rec, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversations, messages, recipients, selected };
  });

  const addMessageToConversations = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender, text };

        const newConversations = prev.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text });
    addMessageToConversations({ recipients, text, sender: id });
  };

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', addMessageToConversations);
    return () => socket.off('receive-message');
  }, [socket, addMessageToConversations]);

  const value = {
    conversations: formattedConversations,
    selectConversationIndex: setSelectedConversationIndex,
    selectConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    createConversation,
  };

  return (
    <div>
      <ConversationContext.Provider value={value}>
        {children}
      </ConversationContext.Provider>
    </div>
  );
};

const arrayEquality = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  a.sort();
  b.sort();
  return a.every((element, index) => {
    return element === b[index];
  });
};
