const { v4: uuidv4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const response = contacts.find((contact) => contact.id === contactId);

    if (!response) {
      return null;
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    const result = contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    contacts[contactIndex] = { id: contactId, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[contactIndex];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
