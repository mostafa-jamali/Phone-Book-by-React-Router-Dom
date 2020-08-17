import types from './Contacts.type';


export const addContact = (contact) => {
    return {
        type: types.ADD_CONTACTS,
        payload: contact
    }
}

export const deleteContact = (id) => {
    return {
        type: types.DELETE_CONTACTS,
        payload: id
    }
}

export const editContact = (contact) => {
    return {
        type: types.EDIT_CONTACTS,
        payload: contact,
    }
}