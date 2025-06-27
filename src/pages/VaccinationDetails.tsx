import React from 'react';
import { ChevronLeft, Syringe, Printer } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const VaccinationDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;

  // Mock data for the patient details
  const patientInfo = {
    patientId: patient?.id || '149723',
    patientName: patient?.patientName || 'Raj Sureshbhai Patel',
    age: patient?.age || '2 years',
    type: patient?.type || 'Vaccination',
    status: 'In Progress'
  };

  const vaccineList = [
    {
      vaccineName: 'DPT Booster',
      expiryDate: 'Invalid Date',
      visitDate: 'Invalid Date',
      price: 800
    },
    {
      vaccineName: 'MMR',
      expiryDate: 'Invalid Date',
      visitDate: 'Invalid Date',
      price: 1200
    },
    {
      vaccineName: 'Hepatitis B',
      expiryDate: 'Invalid Date',
      visitDate: 'Invalid Date',
      price: 1500
    }
  ];

  const totalAmount = vaccineList.reduce((sum, vaccine) => sum + vaccine.price, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        {/* Patient Information Header */}
        <div className="bg-indigo-100 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <Syringe className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vaccination Details</h1>
              <p className="text-gray-600">Patient Information</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-gray-600">Patient ID</p>
              <p className="font-semibold">{patientInfo.patientId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patient Name</p>
              <p className="font-semibold">{patientInfo.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-semibold">{patientInfo.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Type</p>
              <p className="font-semibold">{patientInfo.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-semibold">{patientInfo.status}</p>
            </div>
          </div>
        </div>

        {/* Vaccine List */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Vaccine List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Vaccine Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Visit Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">Price (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {vaccineList.map((vaccine, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{vaccine.vaccineName}</td>
                    <td className="px-6 py-4 text-sm text-red-500">{vaccine.expiryDate}</td>
                    <td className="px-6 py-4 text-sm text-red-500">{vaccine.visitDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{vaccine.price}</td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-semibold">
                  <td className="px-6 py-4 text-sm text-gray-900" colSpan={3}>
                    Total Amount ({vaccineList.length} vaccines)
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹{totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default VaccinationDetails; 