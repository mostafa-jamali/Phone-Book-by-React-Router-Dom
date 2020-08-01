import React, { useState } from 'react'
import Table from '../../Components/Table/Table'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


function Wellcome() {
    const [show, setShow] = useState(true)
    const handleShow = () => setShow(false);

    return (
        <div>
            {
                show ?
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "600px" }}>
                        <Link to="/phone-book-list">
                            <button onClick={() => handleShow()} className="btn btn-info">Wellcome to my phone-book</button>
                        </Link>
                    </div>
                    :
                    <Table />
            }
        </div>
    )
}

export default Wellcome
