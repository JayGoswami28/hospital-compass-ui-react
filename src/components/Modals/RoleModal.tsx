
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface RoleModalProps {
  role?: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: any) => void;
}

const RoleModal: React.FC<RoleModalProps> = ({ role, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: {
      reception: { view: false, add: false, edit: false, delete: false },
      opd: { view: false, add: false, edit: false, delete: false },
      pharmacy: { view: false, add: false, edit: false, delete: false },
      laboratory: { view: false, add: false, edit: false, delete: false }
    }
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || '',
        description: role.description || '',
        permissions: role.permissions || {
          reception: { view: false, add: false, edit: false, delete: false },
          opd: { view: false, add: false, edit: false, delete: false },
          pharmacy: { view: false, add: false, edit: false, delete: false },
          laboratory: { view: false, add: false, edit: false, delete: false }
        }
      });
    }
  }, [role]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (module: string, permission: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof typeof prev.permissions],
          [permission]: checked
        }
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {role ? 'Edit Role' : 'Add Role'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Module Permissions
            </label>
            <div className="space-y-4">
              {Object.entries(formData.permissions).map(([module, perms]) => (
                <div key={module} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 capitalize">{module}</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {Object.entries(perms).map(([permission, value]) => (
                      <label key={permission} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handlePermissionChange(module, permission, e.target.checked)}
                          className="w-4 h-4 text-medical-blue border-gray-300 rounded focus:ring-medical-blue"
                        />
                        <span className="text-sm text-gray-700 capitalize">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-medical-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {role ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleModal;
