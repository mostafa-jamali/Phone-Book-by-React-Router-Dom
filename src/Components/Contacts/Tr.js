import React, { useState } from 'react';
import EditForm from '../Edit/EditForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom'


function Tr({ contacts, setContacts, item, deleteContact }) {

    const [deleteModal, setDeleteModal] = useState(false);
    const toggleDelete = () => setDeleteModal(!deleteModal);

    const [show, setShow] = useState(false);
    const [editObj, setEditObj] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: ""
    })
    const handleDelete = (id) => {
        // setContacts([...contacts.filter(item => item.id != id)])
        deleteContact(id)
    }

    const handleCloseEdit = () => setShow(false);

    const handleShowEdit = () => {
        setShow(true);
        handleEdit(item.id);
    };
    const handleEdit = (id) => {
        const trContact = contacts.filter((contact) => contact.id == id);
        setEditObj(trContact[0]);
    }

    return (
        <>
            <tr className="tr">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.lastName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>
                    <Modal isOpen={deleteModal} toggle={toggleDelete}>
                        <ModalHeader className="bg-warning" toggle={toggleDelete}>Delete Contact</ModalHeader>
                        <ModalBody>
                            Are you sure to delete this contact?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={() => handleDelete(item.id)}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggleDelete}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <button onClick={toggleDelete} className="btn btn-danger mx-1"><i className='fa fa-trash' /></button>
                    <Router>
                        <Link to="/phone-book-list/edit-contact">
                            <button onClick={() => handleShowEdit(item.id)} className="btn btn-primary mx-1"><i className='fa fa-edit' /></button>
                        </Link>
                    </Router>

                    <EditForm
                        contacts={contacts}
                        setContacts={setContacts}
                        show={show}
                        handleCloseEdit={handleCloseEdit}
                        editObj={editObj}
                        setEditObj={setEditObj}
                    />
                </td>
            </tr>
        </>
    )
}

export default Tr;