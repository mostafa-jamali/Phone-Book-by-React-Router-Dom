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
import { Link, useHistory } from 'react-router-dom'



function AddForm({ contacts, setContacts, show, handleClose, addContact }) {
    let history = useHistory();
    const [newObj, setNewObj] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
    })
    const [add, setAdd] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
    });

    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    const validPhoneRegex = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewObj({ ...newObj, [name]: value });

        setAdd(true);

        switch (name) {
            case "name":
                if (value.trim().length < 1) {
                    setAdd(false);
                    errors.name = "Name must be 1 characters (without space) long!";
                } else errors.name = ""
                break;
            case "lastName":
                if (value.trim().length < 1) {
                    setAdd(false);
                    errors.lastName = "Name must be 1 characters (without space) long!";
                } else errors.lastName = ""
                break;
            case "phone":
                if (!validPhoneRegex.test(value)) {
                    setAdd(false);
                    errors.phone = "Phone is not valid!";
                } else errors.phone = ""
                break;
            case "email":
                if (!validEmailRegex.test(value)) {
                    setAdd(false);
                    errors.email = "Email is not valid!";
                } else errors.email = ""
                break;
            default:
                break;
        }
    }
    const handleAdd = (obj) => {
        let id = contacts.reduce((initial, item) => 1 + Math.max(item.id), 0);
        if (id == 0) {
            id = 1;
        }
        addContact({ ...obj, id })
    }

    const handleClear = () => {
        setNewObj({
            name: "",
            lastName: "",
            phone: "",
            email: "",
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (add == true) {
            if (newObj.name != "" && newObj.lastName != "" && newObj.phone != "" && newObj.email != "") {
                handleAdd(newObj);
                handleClose();
                handleClear();
            }
            history.push('/phone-book-list');
        }

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="d-flex flex-column">

                        <label htmlFor="name" className="mb-0 mt-0">name:</label>
                        <input type="text" placeholder="Enter name" name="name" value={newObj.name} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errors.name}</span>}

                        <label htmlFor="latName" className="mb-0 mt-2">latName:</label>
                        <input type="text" placeholder="Enter lastName" name="lastName" value={newObj.lastName} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errors.lastName}</span>}

                        <label htmlFor="phone" className="mb-0 mt-2">phone:</label>
                        <input type="phone" placeholder="Enter phone" name="phone" value={newObj.phone} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errors.phone}</span>}

                        <label htmlFor="email" className="mb-0 mt-2">email:</label>
                        <input type="email" placeholder="Enter email" name="email" value={newObj.email} onChange={handleChange} className="rounded border" />
                        {<span className="error">{errors.email}</span>}

                        <Modal.Footer>
                            <Link to="/phone-book-list">
                                <Button variant="danger" onClick={handleClose}>
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

export default AddForm;