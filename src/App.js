import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import ApplicantRegisterForm from "./sections/ApplicantRegisterForm";
import AddCredentialForm from "./sections/AddCredentialForm";
import LoginForm from "./sections/LoginForm";
import PrivateRoute from "./PrivateRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm />} />

        <Route
          path="/applicant"
          element={
            <PrivateRoute>
              <ApplicantRegisterForm />
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
      </Routes>
    </Router>
  );
}

export default App;
