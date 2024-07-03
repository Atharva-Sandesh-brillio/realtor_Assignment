import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import SourceModal from './components/SourceModal';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import './App.css'; // Ensure your CSS is imported

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleAddSource = async (newSource) => {
    try {
      const updatedUser = { ...currentUser, sources: [...currentUser.sources, newSource] };
      await axios.put(`http://localhost:5000/users/${currentUser.id}`, updatedUser);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.error('Error adding source.', error);
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/create-source" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <div className="main-page bg-gray-900 min-h-screen text-white p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-2 rounded">
                  Create Source
                </button>
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
              </div>
              {showModal && <SourceModal onClose={() => setShowModal(false)} onAddSource={handleAddSource} />}
              <div className="mt-4">
                {currentUser?.sources.map((source, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded mb-2">
                    <p><strong>Lead Type:</strong> {source.leadType}</p>
                    <p><strong>Source Name:</strong> {source.sourceName}</p>
                    <p><strong>Display Name:</strong> {source.displayName}</p>
                    <p><strong>Broker:</strong> {source.broker}</p>
                    <p><strong>Parent Source:</strong> {source.parentSource}</p>
                    <p><strong>Inquiry Type:</strong> {source.inquiryType}</p>
                    <p><strong>Sales Rep:</strong> {source.salesRep}</p>
                    <p><strong>Partner Success Lead:</strong> {source.partnerSuccessLead}</p>
                    <p><strong>Client Category:</strong> {source.clientCategory}</p>
                    <p><strong>Motivation Category:</strong> {source.motivationCategory}</p>
                    <p><strong>Lead Source Type:</strong> {source.leadSourceType}</p>
                    <p><strong>Client Language:</strong> {source.clientLanguage}</p>
                    <p><strong>On Behalf Of Name:</strong> {source.onBehalfOfName}</p>
                    <p><strong>Onboarded:</strong> {source.onboarded ? 'Yes' : 'No'}</p>
                    <p><strong>Seller Only:</strong> {source.sellerOnly ? 'Yes' : 'No'}</p>
                    <p><strong>Alerts Disabled:</strong> {source.alertsDisabled ? 'Yes' : 'No'}</p>
                    <p><strong>Use Realtor Branding:</strong> {source.useRealtorBranding ? 'Yes' : 'No'}</p>
                    <p><strong>Mortgage Source:</strong> {source.mortgageSource ? 'Yes' : 'No'}</p>
                  </div>
                ))}
              </div>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
