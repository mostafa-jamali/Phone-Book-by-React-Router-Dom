import React, { useState } from 'react';
import Search from '../Search/Search'
import Tr from '../Contacts/Tr';
import Editform from '../../views/Add/AddForm';
import '../Table/table.css';
import AddForm from '../../views/Add/AddForm';
import { connect } from 'react-redux';
import { deleteContact } from '../../Redux/Contacts/Contacts.Action';


function Table({ contacts, deleteContact, addContact }) {

    // const [contacts, setContacts] = useState([
    //     { id: 1, name: "ali", lastName: "komijani", phone: "09014356218", email: "ali@gmail.com", action: "" },
    //     { id: 2, name: "mohammad", lastName: "khorrami", phone: "09114356218", email: "mohammad@gmail.com", action: "" },
    //     { id: 3, name: "reza", lastName: "hatami", phone: "09124356218", email: "reza@gmail.com", action: "" },
    //     { id: 4, name: "mahdi", lastName: "sadeghi", phone: "09134356218", email: "sadeghi@gmail.com", action: "" },
    //     { id: 5, name: "hasan", lastName: "mohammadi", phone: "09224356218", email: "hasan@gmail.com", action: "" },
    //     { id: 6, name: "amir", lastName: "sharifi", phone: "09354356218", email: "sharifi@gmail.com", action: "" },
    //     { id: 7, name: "amirali", lastName: "ansari", phone: "09356356218", email: "ansari@gmail.com", action: "" },
    //     { id: 8, name: "mehran", lastName: "mansoori", phone: "09164356218", email: "mehran@gmail.com", action: "" },

    // ]);
    const [search, setSearch] = useState("");

    const chengeHandler = (e) => {
        setSearch(e.target.value)
    };

    let newTr = contacts.filter(item => (
        item.name.toLowerCase().startsWith(search.toLowerCase()) ||
        item.phone.startsWith(search)
    ));

    return (
        <>
            <div className="tableContainer ">
                <Search search={search} setSearch={setSearch} chengeHandler={chengeHandler}  />
                <div className="table-content table-responsive">
                    <table className="table col-12 table-striped table-hover border">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>last name</th>
                                <th>phone</th>
                                <th>email</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newTr.map((item) => (
                                <Tr key={item.id} item={item} contacts={contacts} deleteContact={deleteContact} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        contacts: state.contacts.contacts_list,
    }
}
export default connect(mapStateToProps, { deleteContact })(Table);