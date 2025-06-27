import React, { useState } from 'react';
import { ChevronLeft, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import BedModal from '../components/Modals/BedModal';

const BedManagement: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBed, setEditingBed] = useState<any>(null);

  // Mock bed data with updated field names
  const [beds, setBeds] = useState([
    {
      id: 1,
      name: 'Bed 101',
      bedDescription: 'Deluxe Room with AC',
      price: 1000,
      status: 'Available'
    },
    {
      id: 2,
      name: 'Bed 102',
      bedDescription: 'Corner Room with Window View',
      price: 1200,
      status: 'Occupied',
      patientName: 'Tiya Singh',
      patientId: '150624',
      admitDate: '15-06-2024'
    },
    {
      id: 3,
      name: 'Bed 103',
      bedDescription: 'Corner Room with Window View',
      price: 1200,
      status: 'Available'
    },
    {
      id: 4,
      name: 'Bed 104',
      bedDescription: 'Deluxe Room with AC',
      price: 1200,
      status: 'Occupied',
      patientName: 'Raj Patel',
      patientId: '150624',
      admitDate: '15-06-2024'
    },
    {
      id: 5,
      name: 'Bed 105',
      bedDescription: 'Corner Room with Window View',
      price: 1200,
      status: 'Occupied'
    },
    {
      id: 6,
      name: 'Bed 106',
      bedDescription: 'Deluxe Room with AC',
      price: 1200,
      status: 'Available'
    },
    {
      id: 7,
      name: 'Bed 107',
      bedDescription: 'Corner Room with Window View',
      price: 1200,
      status: 'Occupied'
    },
    {
      id: 8,
      name: 'Bed 108',
      bedDescription: 'Deluxe Room with AC',
      price: 1200,
      status: 'Available'
    }
  ]);

  const handleAddBed = () => {
    setEditingBed(null);
    setIsModalOpen(true);
  };

  const handleEditBed = (bed: any) => {
    setEditingBed(bed);
    setIsModalOpen(true);
  };

  const handleDeleteBed = (bedId: number) => {
    if (window.confirm('Are you sure you want to delete this bed?')) {
      setBeds(beds.filter(bed => bed.id !== bedId));
    }
  };

  const handleSaveBed = (bedData: any) => {
    if (editingBed) {
      setBeds(beds.map(bed => 
        bed.id === editingBed.id ? { ...bed, ...bedData } : bed
      ));
    } else {
      const newBed = {
        id: Math.max(...beds.map(b => b.id)) + 1,
        ...bedData
      };
      setBeds([...beds, newBed]);
    }
    setIsModalOpen(false);
    setEditingBed(null);
  };

  const BedIcon = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-4"
    >
      <rect x="6" y="20" width="36" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="4" y="16" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <rect x="40" y="16" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="6" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="2"/>
      <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
      <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Occupied':
        return 'bg-orange-100 text-orange-800';
      case 'Maintenance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBedIconColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-blue-600';
      case 'Occupied':
        return 'text-purple-400';
      case 'Maintenance':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
            Back
          </button>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-indigo-600 order-first sm:order-none">Bed Management</h1>
          
          <button
            onClick={handleAddBed}
            className="flex items-center bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            Add
          </button>
        </div>

        {/* Bed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
          {beds.map((bed) => (
            <div key={bed.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200 relative">
              {/* Action Buttons */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1 sm:space-x-2">
                <button
                  onClick={() => handleEditBed(bed)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={() => handleDeleteBed(bed.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Bed Icon */}
              <div className={getBedIconColor(bed.status)}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-3 sm:mb-4 sm:w-12 sm:h-12"
                >
                  <rect x="6" y="20" width="36" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="4" y="16" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <rect x="40" y="16" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="6" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="10" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center mb-3 sm:mb-4">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(bed.status)}`}>
                  {bed.status}
                </span>
              </div>

              {/* Bed Info */}
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">{bed.bedDescription}</h3>
                <p className="text-xl sm:text-2xl font-bold text-indigo-600 mb-3 sm:mb-4">₹{bed.price}</p>

                {/* Patient Info for Occupied Beds */}
                {bed.status === 'Occupied' && bed.patientName && (
                  <div className="bg-gray-50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Patient Name:</span>
                      <span className="font-medium truncate ml-2">{bed.patientName}</span>
                    </div>
                    {bed.patientId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">ID:</span>
                        <span className="font-medium">{bed.patientId}</span>
                      </div>
                    )}
                    {bed.admitDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Admit Date:</span>
                        <span className="font-medium">{bed.admitDate}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bed Modal */}
        {isModalOpen && (
          <BedModal
            bed={editingBed}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveBed}
          />
        )}
      </div>
    </Layout>
  );
};

export default BedManagement;
