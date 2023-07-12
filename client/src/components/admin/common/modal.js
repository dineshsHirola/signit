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
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.reason}</p>
      </Modal.Body>
    </Modal>
  );
};

const PopModal2 = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.reason}</p>
      </Modal.Body>
    </Modal>
  );
};

const ImageLinkModal2 = (props) => {
  const newArr = [];
  props.link.map((val) => {
    newArr.push(val);
  });
  console.log(newArr);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.link.map((val, index) => {
          return (
            <>
              <a href={`${process.env.REACT_APP_IMAGE_URL}${val}`}>
                Doc{index + 1},&nbsp;&nbsp;
              </a>
            </>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export { PopModal, PopModal2, ImageLinkModal2 };
