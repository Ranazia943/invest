import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './authcontext/AuthContext';
import { AdminAuthContextProvider } from './authcontext/AdminAuthContext'; // Import AdminAuthContextProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AuthContextProvider>
        <AdminAuthContextProvider > {/* Wrap your app with AdminAuthContextProvider */}
          <App />
        </AdminAuthContextProvider>
      </AuthContextProvider>
    </StrictMode>
  </BrowserRouter>
);
