import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ApplicantRegisterForm from "./sections/ApplicantRegisterForm";
import AddCredentialForm from "./sections/AddCredentialForm";
import LoginForm from "./sections/LoginForm";
import PrivateRoute from "./PrivateRoute";
import ViewCredentials from "./pages/ViewCredentials";
import Navbar from "./components/Navbar";
import ViewApplicants from "./pages/ViewApplicants";
import ApplyJob from "./pages/ApplyJob";
import AppliedJobsTable from "./pages/AppliedJobsTable";
import PostJobForm from "./sections/PostJobForm";
import AddCompanyForm from "./sections/AddCompanyForm";
import ViewJobs from "./pages/ViewJobs";
import LandingLayout from "./components/layouts/LandingLayout";
import { useState } from "react";
import ViewJobsForCompany from "./pages/ViewJobsForCompany";
import AlertBox from "./components/AlertBox";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    console.log('set al: ', alert);
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <Router>
        <Navbar />
        <AlertBox alert={alert}/>
        <Routes>
          <Route path="/" element={<LandingLayout />} />
          <Route path="/login" element={<LoginForm showAlert={showAlert}/>} />
          <Route path="/signup" element={<ApplicantRegisterForm showAlert={showAlert}/>} />

          <Route
            path="/applyJob"
            element={
              <PrivateRoute>
                <ApplyJob showAlert={showAlert}/>
              </PrivateRoute>
            }
          />
          <Route
            path="/addCredential"
            element={
              <PrivateRoute>
                <AddCredentialForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/credentials/:id"
            element={
              <PrivateRoute>
                <ViewCredentials />
              </PrivateRoute>
            }
          />
          <Route
            path="/appliedJobs"
            element={
              <PrivateRoute>
                <AppliedJobsTable />
              </PrivateRoute>
            }
          />
          <Route
            path="/addCompany"
            element={
              <PrivateRoute>
                <AddCompanyForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/postJob"
            element={
              <PrivateRoute>
                <PostJobForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/job/:id"
            element={
              <PrivateRoute>
                <ViewJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <PrivateRoute>
                <ViewApplicants />
              </PrivateRoute>
            }
          />
          <Route
            path="/company/:id/jobs"
            element={
              <PrivateRoute>
                <ViewJobsForCompany />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
