
import React, { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, ShoppingCart } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockVaccines } from '../data/mockData';

const VaccineManagement: React.FC = () => {
  const [vaccines, setVaccines] = useState(mockVaccines);
  const [showForm, setShowForm] = useState(false);
  const [editingVaccine, setEditingVaccine] = useState<any>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    quantity: '', 
    expiry: '',
    status: 'In Stock'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quantity = parseInt(formData.quantity);
    const status = quantity <= 5 ? 'Critical' : quantity <= 25 ? 'Low Stock' : 'In Stock';
    
    if (editingVaccine) {
      setVaccines(vaccines.map(vaccine => 
        vaccine.id === editingVaccine.id 
          ? { ...vaccine, ...formData, quantity, status }
          : vaccine
      ));
    } else {
      setVaccines([...vaccines, { 
        id: vaccines.length + 1, 
        ...formData,
        quantity,
        status
      }]);
    }
    setFormData({ name: '', quantity: '', expiry: '', status: 'In Stock' });
    setShowForm(false);
    setEditingVaccine(null);
  };

  const handleEdit = (vaccine: any) => {
    setEditingVaccine(vaccine);
    setFormData({ 
      name: vaccine.name, 
      quantity: vaccine.quantity.toString(), 
      expiry: vaccine.expiry,
      status: vaccine.status
    });
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setVaccines(vaccines.filter(vaccine => vaccine.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Vaccine Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-medical-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vaccine</span>
          </button>
        </div>

        {/* Alert for low stock */}
        {vaccines.some(v => v.status === 'Critical' || v.status === 'Low Stock') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800 font-medium">
                Warning: Some vaccines are running low in stock!
              </span>
            </div>
          </div>
        )}

        {showForm && (
          <Card title={editingVaccine ? 'Edit Vaccine' : 'Add New Vaccine'}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vaccine Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-blue focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-medical-blue text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingVaccine ? 'Update' : 'Add'} Vaccine
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingVaccine(null);
                    setFormData({ name: '', quantity: '', expiry: '', status: 'In Stock' });
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        <Card title="Vaccines Inventory">
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
                    Quantity
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
                {vaccines.map((vaccine) => (
                  <tr key={vaccine.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      V{vaccine.id.toString().padStart(3, '0')}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vaccine.status)}`}>
                        {vaccine.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => handleEdit(vaccine)}
                        className="text-medical-blue hover:text-blue-700"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(vaccine.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {(vaccine.status === 'Critical' || vaccine.status === 'Low Stock') && (
                        <button
                          className="text-green-600 hover:text-green-800"
                          title="Reorder"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default VaccineManagement;
