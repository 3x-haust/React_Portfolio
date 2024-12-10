import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Lock from './pages/Lock';
import styled from 'styled-components';
import NotFound from './NotFound';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Login from './pages/Login';
import fireAuth from './utils/firebase/fireAuth';
import { onAuthStateChanged } from 'firebase/auth';

const AppContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  overflow: hidden;
`;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = fireAuth;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/lock');
    }
  }, [location.pathname, navigate]);

  const isLoginPage = location.pathname === '/login' || location.pathname === '/lock';

  return (
    <AppContainer>
      {!isLoginPage && <header><MenuBar /></header>}
      <MainContent>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/lock" element={<Lock />} />
        </Routes>
      </MainContent>
      {!isLoginPage && <footer><Dock /></footer>}
    </AppContainer>
  );
};

export default App;
