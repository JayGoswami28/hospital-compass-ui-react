
export const mockPatients = [
  {
    id: 'CS001',
    name: 'Isha Sureshhai Patel',
    mobile: '9123456780',
    dob: '15/05/2020',
    age: '5Y, 1M, 11D',
    type: 'Vaccine',
    payment: 'Cash',
    amount: '₹900'
  },
  {
    id: 'CS002',
    name: 'Rajesh Kumar',
    mobile: '9876543210',
    dob: '12/03/1985',
    age: '39Y, 2M, 15D',
    type: 'Consultation',
    payment: 'Online',
    amount: '₹1,200'
  },
  {
    id: 'CS003',
    name: 'Priya Sharma',
    mobile: '9988776655',
    dob: '28/07/1992',
    age: '32Y, 7M, 3D',
    type: 'Surgery',
    payment: 'Insurance',
    amount: '₹15,000'
  },
  {
    id: 'CS004',
    name: 'Amit Singh',
    mobile: '9001234567',
    dob: '05/11/1978',
    age: '46Y, 4M, 20D',
    type: 'Check-up',
    payment: 'Cash',
    amount: '₹800'
  },
  {
    id: 'CS005',
    name: 'Meera Gupta',
    mobile: '9112233445',
    dob: '19/09/2010',
    age: '14Y, 8M, 7D',
    type: 'Vaccine',
    payment: 'Online',
    amount: '₹650'
  }
];

export const mockRoles = [
  { id: 1, name: 'Administrator', description: 'Full system access' },
  { id: 2, name: 'Doctor', description: 'Medical staff with patient access' },
  { id: 3, name: 'Nurse', description: 'Nursing staff with limited access' },
  { id: 4, name: 'Receptionist', description: 'Front desk operations' }
];

export const mockVaccines = [
  { id: 1, name: 'COVID-19 Vaccine', quantity: 150, expiry: '2025-12-31', status: 'In Stock' },
  { id: 2, name: 'Flu Vaccine', quantity: 25, expiry: '2024-10-15', status: 'Low Stock' },
  { id: 3, name: 'Hepatitis B', quantity: 80, expiry: '2025-06-20', status: 'In Stock' },
  { id: 4, name: 'Tetanus', quantity: 5, expiry: '2024-08-10', status: 'Critical' }
];

export const mockBeds = [
  { id: 1, roomNumber: '101A', status: 'Available', patientName: '', assignedDate: '' },
  { id: 2, roomNumber: '101B', status: 'Occupied', patientName: 'John Doe', assignedDate: '2024-06-20' },
  { id: 3, roomNumber: '102A', status: 'Available', patientName: '', assignedDate: '' },
  { id: 4, roomNumber: '102B', status: 'Maintenance', patientName: '', assignedDate: '' },
  { id: 5, roomNumber: '103A', status: 'Occupied', patientName: 'Jane Smith', assignedDate: '2024-06-18' }
];

export const mockUsers = [
  { id: 1, name: 'Dr. Sarah Wilson', role: 'Doctor', contact: '9876543210', email: 'sarah@hospital.com' },
  { id: 2, name: 'Nurse Mary Johnson', role: 'Nurse', contact: '9876543211', email: 'mary@hospital.com' },
  { id: 3, name: 'Receptionist Lisa Brown', role: 'Receptionist', contact: '9876543212', email: 'lisa@hospital.com' },
  { id: 4, name: 'Dr. Admin', role: 'Administrator', contact: '9876543213', email: 'admin@hospital.com' }
];

export const mockAppointments = [
  {
    id: 1,
    patientName: 'Alice Johnson',
    doctorName: 'Dr. Sarah Wilson',
    date: '2024-06-27',
    time: '10:00 AM',
    type: 'Consultation',
    status: 'Scheduled'
  },
  {
    id: 2,
    patientName: 'Bob Miller',
    doctorName: 'Dr. Michael Brown',
    date: '2024-06-27',
    time: '11:30 AM',
    type: 'Follow-up',
    status: 'Confirmed'
  },
  {
    id: 3,
    patientName: 'Carol Davis',
    doctorName: 'Dr. Sarah Wilson',
    date: '2024-06-28',
    time: '2:00 PM',
    type: 'Check-up',
    status: 'Scheduled'
  }
];
