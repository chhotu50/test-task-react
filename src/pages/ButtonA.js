import React, { useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";
import { listContact, setContactDefaults } from "../../src/store/actions/ContactActions";
import ButtonC from "../components/ButtonC";
import Loading from "../components/Loading";
let CHANGE_TIMEOUT = null;
const ButtonA = (props) => {
  const navigate = useNavigate();
  const [modalShowA, setModalShowA] = useState(true);
  const [modalShowC, setModalShowC] = useState(false);
  const [contactData, setConatctData] = useState([]);
  const [singleContact, setSingleContact] = useState({});
  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    props.setContactDefaults();
    props.listContact("?companyId=171");
  }, []);

  useEffect(() => {
    setConatctData(props.contact.contacts?.formatedContactData);
  }, [props.contact]);

  const handleClose = (page = "/") => {
    setModalShowA(false);
    navigate(page);
  };

  const handleContactView = (item) => {
    setSingleContact(item);
    setModalShowC(true);
  };

  const handleSearchChange = (value) => {
    setQuery(value);
    if (value && value.length > 1) {
      if (CHANGE_TIMEOUT) {
        clearTimeout(CHANGE_TIMEOUT);
      }
      CHANGE_TIMEOUT = setTimeout(() => {
        props.listContact(`?companyId=171&countryId=226&page=${pageNo}&query=${value}`);
      }, 200);
    } else {
      props.listContact(`?companyId=171&countryId=226&page=${pageNo}`);
    }
  };

  const loadMore = () => {
    if (props.contact.list_spinner) {
      return;
    }
    let page = pageNo + 1;
    setPageNo(page);
    if (query) {
      props.listContact(`?companyId=171&countryId=226&page=${page}&query=${query}`);
    } else {
      props.listContact(`?companyId=171&countryId=226&page=${page}`);
    }
  };

  const handleEvenData = (event) => {
    const { checked } = event.target;
    const data = props.contact.contacts.formatedContactData;
    if (checked) {
      setConatctData(data.filter((e) => e.id % 2 === 0));
    } else {
      setConatctData(data);
    }
  };

  return (
    <div>
      <Modal show={modalShowA} onHide={() => handleClose("/")} backdrop="static" keyboard={false} className="modal-wraper">
        {props.contact.list_spinner === true ? <Loading /> : ""}
        <Modal.Header>
          <Modal.Title>ButtonA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contactData ? <input type="text" placeholder="Enter query" className="form-control" onChange={(event) => handleSearchChange(event.target.value)} value={query} /> : ""}
          <Scrollbars style={{ width: 470, height: contactData ? 350 : 100 }}>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {contactData &&
                  contactData.length !== 0 &&
                  contactData.map((contact, index) => {
                    return (
                      <tr key={index} onClick={() => handleContactView(contact)}>
                        <td>{contact.id}</td>
                        <td>{contact?.first_name}</td>
                        <td>{contact?.last_name}</td>
                        <td>{contact?.email}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Scrollbars>
          <Button variant="secondary" type="button" className="btnA">
            All Contacts
          </Button>
          <Button variant="secondary" type="button" onClick={() => handleClose("/buttonB")} className="ml-2 btnB">
            US Contacts
          </Button>
          <Button variant="secondary" onClick={() => handleClose("/")} className="ml-2 btnC">
            Close
          </Button>
        </Modal.Body>
        {contactData ? (
          <Modal.Footer>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Only even" onChange={handleEvenData} />
            </Form.Group>
          </Modal.Footer>
        ) : (
          ""
        )}
        {contactData ? (
          <Button variant="secondary" onClick={loadMore} className="m-4 btnC">
            Load more
          </Button>
        ) : (
          ""
        )}
      </Modal>
      <ButtonC modalShowC={modalShowC} setModalShowC={setModalShowC} data={singleContact} />
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return {
    contact: state.contact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listContact: (page) => dispatch(listContact(page)),
    setContactDefaults: () => dispatch(setContactDefaults()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonA);
