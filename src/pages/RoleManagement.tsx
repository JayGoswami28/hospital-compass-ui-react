
import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import Card from '../components/Common/Card';
import { mockRoles } from '../data/mockData';
import RoleModal from '../components/Modals/RoleModal';

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);

  const handleAddRole = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (roleId: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handleSaveRole = (roleData: any) => {
    if (editingRole) {
      setRoles(roles.map(role => 
        role.id === editingRole.id ? { ...role, ...roleData } : role
      ));
    } else {
      const newRole = {
        id: Math.max(...roles.map(r => r.id)) + 1,
        ...roleData
      };
      setRoles([...roles, newRole]);
    }
    setIsModalOpen(false);
    setEditingRole(null);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
          <button
            onClick={handleAddRole}
            className="inline-flex items-center px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Role
          </button>
        </div>

        {/* Roles Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {role.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {role.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {role.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      <button
                        onClick={() => handleEditRole(role)}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Edit2 className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
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
        </Card>

        {/* Role Modal */}
        {isModalOpen && (
          <RoleModal
            role={editingRole}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveRole}
          />
        )}
      </div>
    </Layout>
  );
};

export default RoleManagement;
