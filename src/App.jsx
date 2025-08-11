import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerifyEmail from "./components/VerifyEmail/Verify-Email";
import CompanyMentions from './components/Dashboard/CompanyMentions'
import ResetPassword from "./components/Login/PasswordReset/ResetPasswordPage/ResetPassword";

export default function App() {
  return (
    // <div className="min-h-screen bg-gray-50 font-sans p-6">
    //   <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
    //     <div>
    //       <VisibilityChart />
    //     </div>
    //     <div>
    //       <IndustryRanking />
    //     </div>
    //     <div>
    //       <CompanyMentions />
    //     </div>
    //     <div>
    //       <SourcesTable />
    //     </div>
    //   </div>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<CompanyMentions />} />
      </Routes>
    </Router>
  );
}
