const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const colors = require("colors");

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(readContacts);

    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const rightContact = contacts.find((contact) => contact.id === contactId);

    if (rightContact) {
      return rightContact;
    } else {
      console.log(colors.bgRed(`User with id ${contactId} was not found`));
      return;
    }
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");
    // await fs.appendFile(contactsPath, JSON.stringify(newContact), "utf-8");

    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    // const rightContact = contacts.find(contact => contact.id == contactId)
    // console.log(rightContact);

    const filtredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filtredContacts));

    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { listContacts, getContactById, addContact, removeContact };
