const initialState = {
    contacts_list: [
        { id: 1, name: "amir", lastName: "sharifi", phone: "09354356218", email: "sharifi@gmail.com", action: "" },
        { id: 2, name: "reza", lastName: "hatami", phone: "09124356218", email: "reza@gmail.com", action: "" },
        // { id: 4, name: "mahdi", lastName: "sadeghi", phone: "09134356218", email: "sadeghi@gmail.com", action: "" },
        // { id: 5, name: "hasan", lastName: "mohammadi", phone: "09224356218", email: "hasan@gmail.com", action: "" },
        // { id: 7, name: "amirali", lastName: "ansari", phone: "09356356218", email: "ansari@gmail.com", action: "" },
        // { id: 8, name: "mehran", lastName: "mansoori", phone: "09164356218", email: "mehran@gmail.com", action: "" },
    ],
    edit_obj: {
        name: "",
        lastName: "",
        phone: "",
        email: ""
    }
}

const ContactsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case "ADD_CONTACTS":
            return {
                ...state,
                contacts_list: [...state.contacts_list, payload]
            }
        case "DELETE_CONTACTS":
            return {
                ...state,
                contacts_list: state.contacts_list.filter(contact => contact.id !== payload)
            }
        case "EDIT_CONTACTS":
            return {
                ...state,
                contacts_list: state.contacts_list.map(contact => contact.id === payload.id ? payload : contact)
                // edit_obj: state.contacts_list.filter((contact) => contact.id == payload)[0]
            }
        default:
            return state
    }
}
export default ContactsReducer
