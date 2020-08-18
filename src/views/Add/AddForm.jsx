import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { propTypes } from "react-bootstrap/esm/Image";
import './validationSpan.css'
import { useHistory } from 'react-router-dom'
import { Card, CardBody, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { addContact } from '../../Redux/Contacts/Contacts.Action';


function AddForm({ contacts, addContact }) {
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
                handleClear();
            }
            history.push('/phone-book-list');
        }

    }

    return (

        <Card className="mx-1 mx-sm-5 bg-info add-form">
            <CardHeader>Add contact</CardHeader>
            <CardBody className="px-5 cardBody">
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

                    <div className="row justify-content-center m-3">
                        <Button variant="secondary" type="reset" onClick={handleClear} className="border mx-2">
                            Clear
                        </Button>
                        <Button variant="success" type="submit" className="border">
                            Save
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts_list,
    }
}
export default connect(mapStateToProps, { addContact })(AddForm);