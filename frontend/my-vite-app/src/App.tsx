import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './styles/components/Registration/MainPage/MainPage';
import LoginPage from './styles/components/Registration/LoginPage/LoginPage';
import RegisterPage from './styles/components/Registration/RegisterPage/RegisterPage';
import ForgotPassword from './styles/components/Registration/ForgotPassword/ForgotPassword';
import EmailVerification from './styles/components/Registration/EmailVerification/EmailVerification';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/email-verification' element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
