import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const SelectForm = () => {
  return (
    <Container>
      <div className="selectForm-parent">
        <div className="selectForm-child">
          <p>Click To Open</p>
          <h1>The Form</h1>
          <div className='selectForm-flex'>
            <Link to={'/form/refundRequestForm'}>Refund Request Form</Link>
            <br />
            <Link to={'/form/complaintForm'}>Complaint Form</Link>
            <br />
            <Link to={'/form/studentRequestForm'}>Student Request Form</Link>
            <br />
            <Link to={'/form/changeOfStudentDetailsForm'}>
              Change Of Student Details Form
            </Link>
            <br />
            <Link to={'/form/applicationForCreditTransfer'}>
              Application for Credit Transfer
            </Link>
            <br />
            <Link to={'/form/applicationToCancelEnrolment'}>
              Application To Cancel Enrolment
            </Link>
            <br />
            <Link to={'/form/gteForm'}>
              Genuine Temporary Entrant (GTE) Form
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SelectForm;
