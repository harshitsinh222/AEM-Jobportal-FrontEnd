import Landing from "./pages/Landing";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicantRegisterForm from "./sections/ApplicantRegisterForm";
import AddCredentialForm from "./sections/AddCredentialForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/applicant" element={<ApplicantRegisterForm />} />
        <Route path="/addCredential" element={<AddCredentialForm />} />
      </Routes>
    </Router>
  );
}

export default App;
