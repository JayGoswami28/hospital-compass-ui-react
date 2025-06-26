
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface VaccineModalProps {
  vaccine?: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (vaccineData: any) => void;
}

const VaccineModal: React.FC<VaccineModalProps> = ({ vaccine, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    expiry: ''
  });

  useEffect(() => {
    if (vaccine) {
      setFormData({
        name: vaccine.name || '',
        price: vaccine.price || '',
        quantity: vaccine.quantity?.toString() || '',
        expiry: vaccine.expiry || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        quantity: '',
        expiry: ''
      });
    }
  }, [vaccine]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {vaccine ? 'Edit Vaccine' : 'Add Vaccine'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vaccine Name
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
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {vaccine ? 'Available Quantity' : 'Total Quantity'}
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
              required
            />
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
              {vaccine ? 'Update Vaccine' : 'Add Vaccine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VaccineModal;
