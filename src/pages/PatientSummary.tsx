import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const PatientSummary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get patient data based on ID (using the same data structure as dashboard)
  const getPatientData = (patientId: string) => {
    // This would normally fetch from an API, but using static data for demo
    const patientMap: { [key: string]: any } = {
      '150520': {
        id: '150520',
        name: 'Isha Sureshbhai Patel',
        mobile: '9123456780',
        dob: '15/05/2020',
        visitType: 'Vaccine',
        paymentMethod: 'Cash',
        amount: '900'
      },
      // Add more patient data as needed
    };
    
    return patientMap[patientId] || {
      id: patientId,
      name: 'Isha Sureshbhai Patel',
      mobile: '9123456780',
      dob: '15/05/2020',
      visitType: 'Vaccine',
      paymentMethod: 'Cash',
      amount: '900'
    };
  };

  const patient = getPatientData(id || '150520');

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Patient Details Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-purple-600">Patient Details</h1>
        </div>

        {/* Patient Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Personal Information & Contact */}
          <div className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 font-medium">Child's Name: </span>
                  <span className="text-gray-800">{patient.name}</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Details</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 font-medium">Mobile: </span>
                  <span className="text-gray-800">{patient.mobile}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Medical Details & Payment */}
          <div className="space-y-8">
            {/* Medical Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical Details</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 font-medium">Date of Birth: </span>
                  <span className="text-gray-800">{patient.dob}</span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Visit Type: </span>
                  <span className="text-gray-800">{patient.visitType}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-600 font-medium">Amount: </span>
                  <span className="text-gray-800">₹{patient.amount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientSummary;
