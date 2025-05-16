import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './styles/components/Registration/MainPage/MainPage';
import LoginPage from './styles/components/Registration/LoginPage/LoginPage';
import RegisterPage from './styles/components/Registration/RegisterPage/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
