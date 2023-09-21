import React, { memo, useEffect,useState } from "react";
import { Modal, Button, Form, Table, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { listContact, setContactDefaults } from "../../src/store/actions/ContactActions";
import ButtonC from "../components/ButtonC";
import Loading from "../components/Loading";
import './modal.scss';
let clearTime = null;
const CustomModal = (props) => {
  const { defaultUrl } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [modalShowB, setModalShowB] = useState(true);
  const [singleContact, setSingleContact] = useState({});
  const [contactData, setConatctData] = useState([]);
  const [modalShowC, setModalShowC] = useState(false);
  const [query, setQuery] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    props.setContactDefaults();
    props.listContact(defaultUrl);
  }, []);

  useEffect(() => {
    setConatctData(props.contact.contacts?.formatedContactData);
  }, [props.contact]);

  /**
   * If different URL found redirect page
   * @param {*} page 
   * @returns 
   */
  const handleClose = (page = "/") => {
    if (pathname === page) {
      return;
    }
    setModalShowB(false);
    navigate(page);
  };

  /**
   * View contact detail
   * @param {*} item 
   */
  const handleContactView = (item) => {
    setSingleContact(item);
    setModalShowC(true);
  };

  /**
   * Search query
   * @param {*} value 
   */
  const handleSearchChange = (value) => {
    setIsChecked(false);
    setQuery(value);
    if (value && value.length > 1) {
      if (clearTime) {
        clearTimeout(clearTime);
      }
      clearTime = setTimeout(() => {
        props.listContact(`${defaultUrl}&page=${pageNo}&query=${value}`);
      }, 200);
    } else if (!value) {
      props.listContact(`${defaultUrl}&page=${pageNo}`);
    }
  };
/**
 * Load more contact
 * @returns 
 */
  const loadMore = () => {
    setIsChecked(false);
    if (props.contact.list_spinner) {
      return;
    }
    let page = pageNo + 1;
    setPageNo(page);
    if (query) {
      props.listContact(`${defaultUrl}&page=${page}&query=${query}`);
    } else {
      props.listContact(`${defaultUrl}&page=${page}`);
    }
  };

  /**
   * Event contact get  (ID based)
   * @param {*} event 
   * get contact
   */
  const handleEvenData = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    const data = props.contact.contacts.formatedContactData;
    if (checked) {
      setConatctData(data.filter((e) => e.id % 2 === 0));
    } else {
      setConatctData(data);
    }
  };

  return (
    <div>
      <Modal show={modalShowB} onHide={() => handleClose("/")} backdrop="static" keyboard={false} className="modal-wraper">
        <Modal.Header>
          <Modal.Title>{pathname ==='/button-a'?'Button A':'Button B'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.contact.error_message?<Alert key={'danger'} variant={'danger'}>{props.contact.error_message}</Alert>:''}
          {contactData ? <input placeholder="Enter query" className="form-control" onChange={(event) => handleSearchChange(event.target.value)} value={query} /> : ""}
          <Scrollbars style={{ width: 470, height: 350 }}>
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
            {props.contact.list_spinner === true ? <Loading /> : ""}
          </Scrollbars>
          <div className="btn-container">
            <Button variant="secondary" type="button" onClick={() => handleClose("/button-a")} className="btn-a">
              All Contacts
            </Button>
            <Button variant="secondary" type="button" className="ml-2 btn-b" onClick={() => handleClose("/button-b")}>
              US Contacts
            </Button>
            <Button variant="secondary" onClick={() => handleClose("/")} className="ml-2 btn-c">
              Close
            </Button>
          </div>
        </Modal.Body>
        {contactData ? (
          <Modal.Footer>
            <Form.Group id="formGridCheckbox">
              <Form.Check type="checkbox" label="Only even" onChange={handleEvenData} checked={isChecked} />
            </Form.Group>
          </Modal.Footer>
        ) : (
          ""
        )}
        {contactData ? (
          <Button variant="secondary" onClick={loadMore} className="m-4 btn-c">
            Load more
          </Button>
        ) : (
          ""
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(memo(CustomModal));
