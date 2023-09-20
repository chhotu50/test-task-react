import React, { useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listContact, setContactDefaults } from "../../src/store/actions/ContactActions";
import ButtonC from "../components/ButtonC";

const ButtonB = (props) => {
  const navigate = useNavigate();
  const [modalShowB, setModalShowB] = useState(true);
  const [hasOnlyEven, setHasOnlyEven] = useState(false);
  const [singleContact, setSingleContact] = useState({});
  const [contactData, conatctData] = useState({});
  const [modalShowC, setModalShowC] = useState(false);
  const [query, setQuery] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    props.setContactDefaults();
    props.listContact("?companyId=171&countryId=226");
  }, []);

  useEffect(() => {
    conatctData(props.contact.contacts);
  }, [props.contact]);

  const handleClose = (page = "/") => {
    setModalShowB(false);
    navigate(page);
  };

  const handleContactView = (item) => {
    setSingleContact(item);
    setModalShowC(true);
  };
  useEffect(() => {
    const timeOutId = setTimeout(() => handleChange(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const handleChange = (value) => {
    if (!value) {
      return;
    }
    setQuerySearch(value);
    props.listContact(`?companyId=171&countryId=226&page=${pageNo}&query=${value}`);
  };

  const loadMore = () => {
    if (props.contact.list_spinner) {
      return;
    }
    let page = pageNo + 1;
    setPageNo(page);
    if(querySearch){
        props.listContact(`?companyId=171&countryId=226&page=${page}&query=${querySearch}`);
    }else{
        props.listContact(`?companyId=171&countryId=226&page=${page}`);
    }
  };

  return (
    <div>
      <Modal show={modalShowB} onHide={() => handleClose("/")} backdrop="static" keyboard={false} className="modal-wraper">
        <Modal.Header closeButton>
          <Modal.Title>ButtonB</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contactData?.contacts ? <input placeholder="Enter query" className="form-control" onChange={(event) => setQuery(event.target.value)} value={querySearch} /> : ""}
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
              {contactData?.contacts &&
                Object.keys(contactData?.contacts).length !== 0 &&
                Object.keys(contactData.contacts).map((key, index) => {
                  const contact = contactData.contacts[key];
                  if (contact.id % 2 === 0 && hasOnlyEven === true) {
                    return (
                      <tr key={index} onClick={() => handleContactView(contact)}>
                        <td>{contact.id}</td>
                        <td>{contact?.first_name}</td>
                        <td>{contact?.last_name}</td>
                        <td>{contact?.email}</td>
                      </tr>
                    );
                  } else if (!hasOnlyEven) {
                    return (
                      <tr key={index} onClick={() => handleContactView(contact)}>
                        <td>{contact.id}</td>
                        <td>{contact?.first_name}</td>
                        <td>{contact?.last_name}</td>
                        <td>{contact?.email}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </Table>

          <Button variant="secondary" type="button" onClick={() => handleClose("/buttonA")} className="btnA">
            All Contacts
          </Button>
          <Button variant="secondary" type="button" className="ml-2 btnB">
            US Contacts
          </Button>
          <Button variant="secondary" onClick={() => handleClose("/")} className="ml-2 btnC">
            Close
          </Button>
        </Modal.Body>
        {contactData?.contacts ? (
          <Modal.Footer>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Only even" onChange={(event) => setHasOnlyEven(event.target.checked)} />
            </Form.Group>
          </Modal.Footer>
        ) : (
          ""
        )}
        {contactData?.contacts ?  <Button variant="secondary" onClick={loadMore} className="m-4 btnC">
          Load more
        </Button>:''}
      </Modal>
      <ButtonC data={singleContact} modalShowC={modalShowC} setModalShowC={setModalShowC} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonB);
