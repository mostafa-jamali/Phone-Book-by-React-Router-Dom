import {combineReducers} from 'redux';
import ContactsReducer from './Contacts/Contacts.Reducer';

export default combineReducers({
    contacts: ContactsReducer,
})