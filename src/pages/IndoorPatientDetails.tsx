import React from 'react';
import { ChevronLeft, Bed, Printer } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

const IndoorPatientDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;

  // Mock data for the patient details
  const patientInfo = {
    patientId: patient?.id || '149721',
    patientName: patient?.patientName || 'Tanvi Maheshbhai Varma',
    age: patient?.age || '4 years',
    type: patient?.type || 'Indoor',
    status: 'Completed'
  };

  const bedDetails = {
    bedNumber: 'B-101',
    ward: 'Deluxe Ward',
    floor: 'First Floor',
    admitDate: 'Mar 15, 2024'
  };

  const medicineDetails = [
    {
      medicineName: 'Paracetamol',
      quantity: 10,
      startDate: 'Mar 15, 2024',
      dischargeDate: 'Mar 20, 2024'
    },
    {
      medicineName: 'Amoxicillin',
      quantity: 15,
      startDate: 'Mar 15, 2024',
      dischargeDate: 'Mar 22, 2024'
    },
    {
      medicineName: 'Omeprazole',
      quantity: 8,
      startDate: 'Mar 16, 2024',
      dischargeDate: 'Mar 21, 2024'
    }
  ];

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
            <Bed className="w-8 h-8 text-indigo-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Indoor Patient Details</h1>
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

        {/* Bed Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Bed Details</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Bed Number</p>
                <p className="font-semibold text-lg">{bedDetails.bedNumber}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Ward</p>
                <p className="font-semibold text-lg">{bedDetails.ward}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Floor</p>
                <p className="font-semibold text-lg">{bedDetails.floor}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Admit Date</p>
                <p className="font-semibold text-lg">{bedDetails.admitDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Medicine Details */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Medicine Details</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-indigo-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Medicine Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Discharge Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {medicineDetails.map((medicine, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{medicine.medicineName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{medicine.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{medicine.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{medicine.dischargeDate}</td>
                  </tr>
                ))}
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

export default IndoorPatientDetails; 