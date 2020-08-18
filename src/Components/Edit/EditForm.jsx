import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import { propTypes } from "react-bootstrap/esm/Image";
import './validationSpan.css'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { editContact } from '../../Redux/Contacts/Contacts.Action';


function EditForm({ contacts, setContacts, show, editObj, setEditObj, handleCloseEdit, editContact }) {
    const history = useHistory();
    const [errorsEdit, setErrorsEdit] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",

    });
    const [edit, setEdit] = useState(true);


    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validPhoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditObj({ ...editObj, [name]: value });

        setEdit(true);

        switch (name) {
            case "name":
                if (value.trim().length < 1) {
                    setEdit(false);
                    errorsEdit.name = "Name must be 1 characters (without space) long!";
                } else errorsEdit.name = ""
                break;
            case "lastName":
                if (value.trim().length < 1) {
                    setEdit(false);
                    errorsEdit.lastName = "Name must be 1 characters (without space) long!";
                } else errorsEdit.lastName = ""
                break;
            case "phone":
                if (!validPhoneRegex.test(value)) {
                    setEdit(false);
                    errorsEdit.phone = "Phone is not valid!";
                } else errorsEdit.phone = ""
                break;
            case "email":
                if (!validEmailRegex.test(value)) {
                    setEdit(false);
                    errorsEdit.email = "Email is not valid!";
                } else errorsEdit.email = ""
                break;
            default:
                break;
        }
    }

    const handleClear = () => {
        setEditObj({
            name: "",
            lastName: "",
            phone: "",
            email: "",
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        edit == true && editContact(editObj) && handleCloseEdit();
        // setContacts([...contacts.map((item) => {
        //     if ((item.id == editObj.id) && (edit == true)) {
        //         item.name = editObj.name;
        //         item.lastName = editObj.lastName;
        //         item.phone = editObj.phone;
        //         item.email = editObj.email;
        //         handleClear();
        //         handleCloseEdit();
        //         return editObj;
        //     } else return item;
        // })]);
        history.push("/phone-book-list")
    }

    return (
        <>
            <Modal show={show} onHide={handleCloseEdit}>
                <Modal.Header >
                    <Modal.Title>Edit contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="d-flex flex-column">

                        <label htmlFor="name" className="mb-0 mt-0">name:</label>
                        <input type="text" placeholder="Enter name" name="name" value={editObj.name} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errorsEdit.name}</span>}

                        <label htmlFor="latName" className="mb-0 mt-2">latName:</label>
                        <input type="text" placeholder="Enter lastName" name="lastName" value={editObj.lastName} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errorsEdit.lastName}</span>}

                        <label htmlFor="phone" className="mb-0 mt-2">phone:</label>
                        <input type="phone" placeholder="Enter phone" name="phone" value={editObj.phone} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errorsEdit.phone}</span>}

                        <label htmlFor="email" className="mb-0 mt-2">email:</label>
                        <input type="email" placeholder="Enter email" name="email" value={editObj.email} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errorsEdit.email}</span>}

                        <Modal.Footer>
                            <Link to="/phone-book-list">
                                <Button variant="danger" onClick={handleCloseEdit}>
                                    Close
                                </Button>
                            </Link>
                            <Button variant="secondary" type="reset" onClick={handleClear}>
                                Clear
                            </Button>
                            <Button variant="success" type="submit">
                                Save
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );

}
const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts_list,
    }
}
export default connect(mapStateToProps, { editContact })(EditForm);
