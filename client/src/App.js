import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RefundRequestForm from './components/forms/refundRequestForm';
import SelectForm from './components/SelectForm';
import ComplaintForm from './components/forms/complaintForm';
import StudentRequestForm from './components/forms/studentRequestForm';
import ChangeOfStudentDetailsForm from './components/forms/changeOfStudentDetailsForm';
import ApplicationForCreditTransfer from './components/forms/applicationForCreditTransfer';
import ApplicationToCancelEnrolment from './components/forms/applicationToCancelEnrolment';
import GTEForm from './components/forms/gteForm';
import Dashboard from './components/admin/dashboard';
import Login from './components/admin/login';
import GteFormData from './components/admin/gteFormData';
import ApplicationForCreditTransferData from './components/admin/applicationForCreditTransfer';
import ApplicationToCancelEnrolmentData from './components/admin/applicationToCancelEnrolment';
import ChangeOfStudentDetailsFormData from './components/admin/changeOfStudentDetailsForm';
import ComplaintFormData from './components/admin/complaintForm';
import RefundRequestFormData from './components/admin/refundRequestForm';
import StudentRequestFormData from './components/admin/studentRequestForm';
import ComplaintSM from './components/admin/showmore/complaintSM';
import GtefSM from './components/admin/showmore/gteSM';
import CreditSM from './components/admin/showmore/creditSM';
import CancelSM from './components/admin/showmore/cancelSM';
import ChangeSM from './components/admin/showmore/changeSM';
import RefundSM from './components/admin/showmore/refundSM';
import StudentReqSM from './components/admin/showmore/studentReqSM';
import AdminSelectForm from './components/admin/adminSelectForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<SelectForm />} />
          <Route
            path="/form/refundRequestForm"
            exact
            element={<RefundRequestForm />}
          />
          <Route path="/form/complaintForm" exact element={<ComplaintForm />} />
          <Route
            path="/form/studentRequestForm"
            exact
            element={<StudentRequestForm />}
          />
          <Route
            path="/form/changeOfStudentDetailsForm"
            exact
            element={<ChangeOfStudentDetailsForm />}
          />
          <Route
            path="/form/applicationForCreditTransfer"
            exact
            element={<ApplicationForCreditTransfer />}
          />
          <Route
            path="/form/applicationToCancelEnrolment"
            exact
            element={<ApplicationToCancelEnrolment />}
          />
          <Route path="/form/gteForm" exact element={<GTEForm />} />

          {/* admin-routes */}

          <Route path="/admin/login" exact element={<Login />} />

          <Route path="/admin" exact element={<Dashboard />} />
          <Route path='/admin/forms' exact element={<AdminSelectForm />} />
          <Route path="/admin/gteFormData" exact element={<GteFormData />} />
          <Route
            path="/admin/applicationForCreditTransferData"
            exact
            element={<ApplicationForCreditTransferData />}
          />
          <Route
            path="/admin/applicationToCancelEnrolmentData"
            exact
            element={<ApplicationToCancelEnrolmentData />}
          />
          <Route
            path="/admin/changeOfStudentDetailsFormData"
            exact
            element={<ChangeOfStudentDetailsFormData />}
          />
          <Route
            path="/admin/complaintFormData"
            exact
            element={<ComplaintFormData />}
          />
          <Route
            path="/admin/refundRequestFormData"
            exact
            element={<RefundRequestFormData />}
          />
          <Route
            path="/admin/studentRequestFormData"
            exact
            element={<StudentRequestFormData />}
          />

          <Route
            path="/admin/complaintFormData/:id"
            exact
            element={<ComplaintSM />}
          />
          <Route path="/admin/gteFormData/:id" exact element={<GtefSM />} />
          <Route
            path="/admin/applicationForCreditTransferData/:id"
            exact
            element={<CreditSM />}
          />
          <Route
            path="/admin/applicationToCancelEnrolmentData/:id"
            exact
            element={<CancelSM />}
          />
          <Route
            path="/admin/changeOfStudentDetailsFormData/:id"
            exact
            element={<ChangeSM />}
          />
          <Route
            path="/admin/refundRequestFormData/:id"
            exact
            element={<RefundSM />}
          />
          <Route
            path="/admin/studentRequestFormData/:id"
            exact
            element={<StudentReqSM />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
