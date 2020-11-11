import React, { useContext } from 'react';
import UseLocalStorage from '../Hooks/UseLocalStorage';

const ContactContext = React.createContext();

export const useContacts = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = UseLocalStorage('contacts', []);

  const createContact = (id, name) => {
    setContacts((prev) => {
      return [...prev, { id, name }];
    });
  };

  return (
    <div>
      <ContactContext.Provider value={{ contacts, createContact }}>
        {children}
      </ContactContext.Provider>
    </div>
  );
};
