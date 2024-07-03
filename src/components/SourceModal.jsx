import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SourceModal = ({ onClose, onAddSource }) => {
  const [formData, setFormData] = useState({
    leadType: '',
    sourceName: '',
    displayName: '',
    broker: '',
    parentSource: '',
    inquiryType: '',
    salesRep: '',
    partnerSuccessLead: '',
    clientCategory: '',
    motivationCategory: '',
    leadSourceType: '',
    clientLanguage: '',
    onBehalfOfName: '',
    onboarded: false,
    sellerOnly: false,
    alertsDisabled: false,
    useRealtorBranding: false,
    mortgageSource: false,
  });

  const dropdownOptions = {
    broker: ['Broker 1', 'Broker 2', 'Broker 3'],
    parentSource: ['Parent Source 1', 'Parent Source 2', 'Parent Source 3'],
    inquiryType: ['Inquiry Type 1', 'Inquiry Type 2', 'Inquiry Type 3'],
    salesRep: ['Sales Rep 1', 'Sales Rep 2', 'Sales Rep 3'],
    partnerSuccessLead: ['Partner Success Lead 1', 'Partner Success Lead 2', 'Partner Success Lead 3'],
    clientCategory: ['Client Category 1', 'Client Category 2', 'Client Category 3'],
    motivationCategory: ['Motivation Category 1', 'Motivation Category 2', 'Motivation Category 3'],
    leadSourceType: ['Lead Source Type 1', 'Lead Source Type 2', 'Lead Source Type 3'],
    clientLanguage: ['Language 1', 'Language 2', 'Language 3'],
  };

  const [sources, setSources] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.sources) {
      setSources(location.state.sources);
    }
  }, [location.state]);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sourceName || !formData.parentSource || !formData.inquiryType) {
      toast.error('Source Name, Parent Source, and Inquiry Type are required.');
      return;
    }

    try {
      onAddSource(formData);
      setSources([...sources, formData]);
      onClose();
    } catch (error) {
      toast.error('Error saving source data.');
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 overflow-auto">
      <div className="w-full flex justify-end p-4 bg-gray-800">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 focus:outline-none">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="rounded-full w-8 h-8"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="bg-gray-900 p-8 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Create New Source</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Lead Type *</label>
              <select name="leadType" value={formData.leadType} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required>
                <option value="Rev Share">Rev Share</option>
                <option value="John doe">John doe</option>
                <option value="Christopher nolan">Christopher nolan</option>
                <option value="Will Smith">Will Smith</option>
                <option value="Christian Bale">Christian Bale</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Source Name *</label>
              <input
                type="text"
                name="sourceName"
                value={formData.sourceName}
                onChange={handleChange}
                className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Broker</label>
              <select name="broker" value={formData.broker} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.broker.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Parent Source *</label>
              <select name="parentSource" value={formData.parentSource} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required>
                <option value="">Select...</option>
                {dropdownOptions.parentSource.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Inquiry Type *</label>
              <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none" required>
                <option value="">Select...</option>
                {dropdownOptions.inquiryType.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Sales Rep</label>
              <select name="salesRep" value={formData.salesRep} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.salesRep.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Partner Success Lead</label>
              <select name="partnerSuccessLead" value={formData.partnerSuccessLead} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.partnerSuccessLead.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mt-6 mb-2">Implementation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Client Category</label>
              <select name="clientCategory" value={formData.clientCategory} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.clientCategory.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Motivation Category</label>
              <select name="motivationCategory" value={formData.motivationCategory} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.motivationCategory.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Lead Source Type</label>
              <select name="leadSourceType" value={formData.leadSourceType} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.leadSourceType.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-sm text-white">Client Language</label>
              <select name="clientLanguage" value={formData.clientLanguage} onChange={handleChange} className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="">Select...</option>
                {dropdownOptions.clientLanguage.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col col-span-2">
              <label className="mb-1 text-sm text-white">On Behalf Of Name</label>
              <input
                type="text"
                name="onBehalfOfName"
                value={formData.onBehalfOfName}
                onChange={handleChange}
                className="border p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap mt-6">
            <label className="mr-4 text-white flex items-center">
              <input
                type="checkbox"
                name="onboarded"
                checked={formData.onboarded}
                onChange={handleChange}
                className="mr-2"
              />
              Onboarded
            </label>
            <label className="mr-4 text-white flex items-center">
              <input
                type="checkbox"
                name="sellerOnly"
                checked={formData.sellerOnly}
                onChange={handleChange}
                className="mr-2"
              />
              Seller Only
            </label>
            <label className="mr-4 text-white flex items-center">
              <input
                type="checkbox"
                name="alertsDisabled"
                checked={formData.alertsDisabled}
                onChange={handleChange}
                className="mr-2"
              />
              Alerts Disabled
            </label>
            <label className="mr-4 text-white flex items-center">
              <input
                type="checkbox"
                name="useRealtorBranding"
                checked={formData.useRealtorBranding}
                onChange={handleChange}
                className="mr-2"
              />
              Use Realtor Branding
            </label>
            <label className="mr-4 text-white flex items-center">
              <input
                type="checkbox"
                name="mortgageSource"
                checked={formData.mortgageSource}
                onChange={handleChange}
                className="mr-2"
              />
              Mortgage Source
            </label>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">Add Source</button>
          </div>
        </form>
        <div className="mt-6 text-white w-full">
          {sources.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Sources List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Lead Type</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Source Name</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Display Name</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Broker</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Parent Source</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Inquiry Type</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Sales Rep</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Partner Success Lead</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Client Category</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Motivation Category</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Lead Source Type</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Client Language</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">On Behalf Of Name</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Onboarded</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Seller Only</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Alerts Disabled</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Use Realtor Branding</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-white uppercase tracking-wider">Mortgage Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.map((source, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-600'}`}>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.leadType}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.sourceName}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.displayName}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.broker}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.parentSource}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.inquiryType}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.salesRep}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.partnerSuccessLead}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.clientCategory}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.motivationCategory}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.leadSourceType}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.clientLanguage}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.onBehalfOfName}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.onboarded ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.sellerOnly ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.alertsDisabled ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.useRealtorBranding ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">{source.mortgageSource ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceModal;
