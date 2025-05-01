import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCase from './pages/CreateCase';
import AdminCaseView from './pages/AdminCaseView';
import CreateUser from './pages/CreateUser';
import UserCasePage from './pages/UserCasePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-case" element={<CreateCase />} />
        <Route path="/admin/cases" element={<AdminCaseView />} />
        <Route path="/admin/users" element={<CreateUser />} />
        <Route path="/user/:userId/case/:caseId" element={<UserCasePage />} />
      </Routes>
    </BrowserRouter>
  );
}
