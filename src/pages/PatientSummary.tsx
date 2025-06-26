
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Phone, User, Activity } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockPatients } from '../data/mockData';

const PatientSummary: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const patient = mockPatients.find(p => p.id === id);

  if (!patient) {
    return (
      <Layout>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-700">Patient not found</h2>
        </div>
      </Layout>
    );
  }

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob.split('/').reverse().join('-'));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Patient Summary</h1>
        </div>

        {/* Patient Summary Card */}
        <Card>
          <div className="p-6">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{patient.name}</h2>
              <p className="text-gray-600">Patient ID: {patient.id}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar className="w-8 h-8 text-medical-blue mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
                <p className="font-semibold text-gray-900">{patient.dob}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Activity className="w-8 h-8 text-medical-blue mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Age</p>
                <p className="font-semibold text-gray-900">{calculateAge(patient.dob)} years</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Phone className="w-8 h-8 text-medical-blue mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Mobile</p>
                <p className="font-semibold text-gray-900">{patient.mobile}</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Last Visit</p>
                    <p className="text-sm text-gray-600">June 20, 2024 - {patient.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Treatment Status</p>
                    <p className="text-sm text-gray-600">Active - Regular monitoring</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Next Appointment</p>
                    <p className="text-sm text-gray-600">July 15, 2024 - Follow-up</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
              <button className="flex-1 bg-medical-blue text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Schedule Appointment
              </button>
              <button className="flex-1 border border-medical-blue text-medical-blue py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                View Full History
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientSummary;
