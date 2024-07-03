import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const securityQuestions = [
    "What was the name of your first pet?",
    "What is your mother's maiden name?",
    "What was the name of your elementary school?",
    "What is your favorite book?",
    "What city were you born in?"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateSecurityInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;
      const user = users.find(u => u.email === formData.email && u.securityQuestion === formData.securityQuestion && u.securityAnswer === formData.securityAnswer);
      if (!user) {
        toast.error('Invalid credentials.');
        return false;
      }
      return true;
    } catch (error) {
      toast.error('Error validating security information.');
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showPasswordFields) {
      if (formData.newPassword.length < 8 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.newPassword)) {
        toast.error('New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/users');
        const users = response.data;
        const user = users.find(u => u.email === formData.email && u.securityQuestion === formData.securityQuestion && u.securityAnswer === formData.securityAnswer);
        user.password = CryptoJS.AES.encrypt(formData.newPassword, 'your-secret-key').toString();
        await axios.put(`http://localhost:5000/users/${user.id}`, user);
        toast.success('Password reset successful!');
        navigate('/login');
      } catch (error) {
        toast.error('Error updating password.');
      }
    } else {
      const isValid = await validateSecurityInfo();
      if (isValid) {
        setShowPasswordFields(true);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="flex w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="securityQuestion" className="block text-sm font-medium text-gray-700">Security Question</label>
              <select
                name="securityQuestion"
                id="securityQuestion"
                value={formData.securityQuestion}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                required
              >
                <option value="">Select a question</option>
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>{question}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="securityAnswer" className="block text-sm font-medium text-gray-700">Security Answer</label>
              <input
                type="text"
                name="securityAnswer"
                id="securityAnswer"
                value={formData.securityAnswer}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                required
              />
            </div>
            {showPasswordFields && (
              <>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full p-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>
              </>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {showPasswordFields ? 'Reset Password' : 'Validate Security Info'}
              </button> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
