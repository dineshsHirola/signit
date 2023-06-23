import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Table } from '@nextui-org/react';

const ContactUsModal = (props) => {
  const interest = [
    props.data.interests.automotiveCourses,
    props.data.interests.businessCourses,
    props.data.interests.bandcCourses,
    props.data.interests.communityServiceCourses,
    props.data.interests.healthCourses,
    props.data.interests.geCourses,
  ];
  const result = interest.filter((value, index) => {
    if (value === true) {
      return value;
    }
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Contact Us Form Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table
          aria-label="Example table with static content"
          css={{
            height: 'auto',
            minWidth: '100%',
          }}
          selectionMode="single"
        >
          <Table.Header>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>DETAILS</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{props.data.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Email</Table.Cell>
              <Table.Cell>{props.data.email}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Mobile</Table.Cell>
              <Table.Cell>{props.data.mobile}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Country</Table.Cell>
              <Table.Cell>{props.data.country}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Message</Table.Cell>
              <Table.Cell>{props.data.message}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Interests</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Automotive
                Courses
              </Table.Cell>
              <Table.Cell>
                {props.data.interests.automotiveCourses ? 'Yes' : 'No'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Business
                Courses
              </Table.Cell>
              <Table.Cell>
                {props.data.interests.businessCourses ? 'Yes' : 'No'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Building &
                Construction Courses
              </Table.Cell>
              <Table.Cell>
                {props.data.interests.bandcCourses ? 'Yes' : 'No'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Community
                Service Courses
              </Table.Cell>
              <Table.Cell>
                {props.data.interests.communityServiceCourses ? 'Yes' : 'No'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Health
                Course
              </Table.Cell>
              <Table.Cell>
                {props.data.interests.healthCourses ? 'Yes' : 'No'}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GE Courses
              </Table.Cell>
              <Table.Cell>
                {props.data.interests.geCourses ? 'Yes' : 'No'}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUsModal;
