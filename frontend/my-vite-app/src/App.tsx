import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './styles/components/Registration/MainPage/MainPage';
import LoginPage from './styles/components/Registration/LoginPage/LoginPage';
import RegisterPage from './styles/components/Registration/RegisterPage/RegisterPage';
import ForgotPassword from './styles/components/Registration/ForgotPassword/ForgotPassword';
import EmailVerification from './styles/components/Registration/EmailVerification/EmailVerification';
import PasswordReset from './styles/components/Registration/PasswordReset/PasswordReset';
import PasswordSucces from './styles/components/Registration/PasswordSucces/PasswordSucces';
import AppFooter from './styles/components/AppFooter/AppFooter';
import HomePage from './styles/components/HomePage/HomePage';

function App() {
    const noFooterPaths = ['/login', '/register', '/forgot-password', '/email-verification', '/password-reset', '/password-succes'];
    const showFooter = !noFooterPaths.includes(location.pathname);
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/email-verification' element={<EmailVerification />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        <Route path='/password-succes' element={<PasswordSucces />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
      {showFooter && <AppFooter />}
    </BrowserRouter>
    
    </div>
  );
}

export default App;
