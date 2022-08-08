import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
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
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<ApplicantRegisterForm />} />

          <Route
            path="/applyJob"
            element={
              <PrivateRoute>
                <ApplyJob />
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
            path="/applicants/:id"
            element={
              <PrivateRoute>
                <ViewApplicants />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
