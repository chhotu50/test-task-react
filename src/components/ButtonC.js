import React, { memo } from "react";
import { Modal, Button } from "react-bootstrap";
const ButtonC = (props) => {
  const { modalShowC, setModalShowC,data } = props;
  const handleClose = () => {
    setModalShowC(false);
  };
  return (
    <div>
      <Modal show={modalShowC} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>ButtonC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID : {data?.id}</p>
          <p>First name : {data?.first_name}</p>
          <p>Last name : {data?.last_name}</p>
          <p>Email : {data?.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(ButtonC);
