import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockVaccines } from '../data/mockData';
import VaccineModal from '../components/Modals/VaccineModal';

const VaccineManagement: React.FC = () => {
  const [vaccines, setVaccines] = useState(mockVaccines);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<any>(null);

  const filteredVaccines = vaccines.filter(vaccine =>
    vaccine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVaccines.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentVaccines = filteredVaccines.slice(startIndex, endIndex);

  const handleAddVaccine = () => {
    setEditingVaccine(null);
    setIsModalOpen(true);
  };

  const handleEditVaccine = (vaccine: any) => {
    setEditingVaccine(vaccine);
    setIsModalOpen(true);
  };

  const handleDeleteVaccine = (vaccineId: number) => {
    if (window.confirm('Are you sure you want to delete this vaccine?')) {
      setVaccines(vaccines.filter(vaccine => vaccine.id !== vaccineId));
      // Reset to page 1 if current page becomes empty
      const newFilteredVaccines = vaccines.filter(vaccine => vaccine.id !== vaccineId && vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const newTotalPages = Math.ceil(newFilteredVaccines.length / rowsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(1);
      }
    }
  };

  const handleSaveVaccine = (vaccineData: any) => {
    if (editingVaccine) {
      setVaccines(vaccines.map(vaccine => 
        vaccine.id === editingVaccine.id ? { ...vaccine, ...vaccineData } : vaccine
      ));
    } else {
      const newVaccine = {
        id: Math.max(...vaccines.map(v => v.id)) + 1,
        ...vaccineData,
        status: vaccineData.quantity > 50 ? 'In Stock' : 
                vaccineData.quantity > 10 ? 'Low Stock' : 'Critical'
      };
      setVaccines([...vaccines, newVaccine]);
    }
    setIsModalOpen(false);
    setEditingVaccine(null);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Vaccine Management</h1>
          <button
            onClick={handleAddVaccine}
            className="inline-flex items-center px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Vaccine
          </button>
        </div>

        {/* Vaccines Table */}
        <Card>
          {/* Search */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search vaccines..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent w-full"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Rows per page:</span>
              <select 
                value={rowsPerPage}
                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>|</span>
              <span>{startIndex + 1}-{Math.min(endIndex, filteredVaccines.length)} of {filteredVaccines.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vaccine ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vaccine Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Available Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentVaccines.map((vaccine) => (
                  <tr key={vaccine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vaccine.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {vaccine.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vaccine.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {vaccine.expiry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vaccine.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                        vaccine.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {vaccine.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => handleEditVaccine(vaccine)}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVaccine(vaccine.id)}
                        className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select 
                  value={rowsPerPage}
                  onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">
                  {startIndex + 1}-{Math.min(endIndex, filteredVaccines.length)} of {filteredVaccines.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ««
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ‹
                </button>
                <span className="px-3 py-1 bg-blue-600 text-white rounded">
                  {currentPage}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  ›
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  »»
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Vaccine Modal */}
        {isModalOpen && (
          <VaccineModal
            vaccine={editingVaccine}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveVaccine}
          />
        )}
      </div>
    </Layout>
  );
};

export default VaccineManagement;
