import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Switch } from '../components/ui/switch';

const RolePermissions: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingRole = location.state?.role;

  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    reception: { view: false, add: false, edit: false, delete: false },
    opd: { view: false, add: false, edit: false, delete: false },
    indoor: { view: false, add: false, edit: false, delete: false },
    vaccine: { view: false, add: false, edit: false, delete: false },
    bookAppointment: { view: false, add: false, edit: false, delete: false },
    oldPatient: { view: false, add: false, edit: false, delete: false },
    newPatient: { view: false, add: false, edit: false, delete: false },
  });

  const modules = [
    { key: 'reception', label: 'Reception' },
    { key: 'opd', label: 'OPD' },
    { key: 'indoor', label: 'Indoor' },
    { key: 'vaccine', label: 'Vaccine' },
    { key: 'bookAppointment', label: 'Book Appointment' },
    { key: 'oldPatient', label: 'Old Patient' },
    { key: 'newPatient', label: 'New Patient' },
  ];

  useEffect(() => {
    if (editingRole) {
      setRoleName(editingRole.name || '');
      setPermissions(editingRole.permissions || permissions);
    }
  }, [editingRole]);

  const handlePermissionChange = (module: string, permission: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module as keyof typeof prev],
        [permission]: checked
      }
    }));
  };

  const handleCancel = () => {
    navigate('/roles');
  };

  const handleSave = () => {
    // Here you would typically save the role data
    console.log('Saving role:', { name: roleName, permissions });
    navigate('/roles');
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-purple-600">Role Permissions</h1>

        {/* Role Name Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Role Name
          </label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter role name"
          />
        </div>

        {/* Permissions Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Module
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  View
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Add
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Edit
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {modules.map((module) => (
                <tr key={module.key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {module.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Switch
                      checked={permissions[module.key as keyof typeof permissions]?.view || false}
                      onCheckedChange={(checked) => handlePermissionChange(module.key, 'view', checked)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Switch
                      checked={permissions[module.key as keyof typeof permissions]?.add || false}
                      onCheckedChange={(checked) => handlePermissionChange(module.key, 'add', checked)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Switch
                      checked={permissions[module.key as keyof typeof permissions]?.edit || false}
                      onCheckedChange={(checked) => handlePermissionChange(module.key, 'edit', checked)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Switch
                      checked={permissions[module.key as keyof typeof permissions]?.delete || false}
                      onCheckedChange={(checked) => handlePermissionChange(module.key, 'delete', checked)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RolePermissions; 