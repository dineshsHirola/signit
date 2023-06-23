import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const PopModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Reason</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.reason}</p>
      </Modal.Body>
    </Modal>
  );
};

export default PopModal;
