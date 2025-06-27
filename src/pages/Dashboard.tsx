import React, { useState } from 'react';
import { Search, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Extended mock data for testing pagination and filtering
  const paymentData = [
    {
      id: '150520',
      name: 'Isha Sureshbhai Patel',
      mobile: '9123456780',
      dob: '15/05/2020',
      age: '5Y, 1M, 11D',
      type: 'Vaccine',
      payment: 'Cash',
      amount: '₹900'
    },
    {
      id: '100422',
      name: 'Kabir Amitbhai Singh',
      mobile: '9988776655',
      dob: '10/04/2022',
      age: '3Y, 2M, 16D',
      type: 'OPD',
      payment: 'Online',
      amount: '₹350'
    },
    {
      id: '200323',
      name: 'Riya Vikasbhai Sharma',
      mobile: '9090909090',
      dob: '20/03/2023',
      age: '2Y, 3M, 6D',
      type: 'Vaccine',
      payment: 'Cash',
      amount: '₹800'
    },
    {
      id: '280221',
      name: 'Vihaan Sanjaybhai Gupta',
      mobile: '9876501234',
      dob: '28/02/2021',
      age: '4Y, 3M, 29D',
      type: 'OPD',
      payment: 'Online',
      amount: '₹300'
    },
    {
      id: '121120',
      name: 'Anaya Maheshbhai Joshi',
      mobile: '9876543211',
      dob: '12/11/2020',
      age: '4Y, 7M, 14D',
      type: 'OPD',
      payment: 'Cash',
      amount: '₹500'
    },
    {
      id: '051018',
      name: 'Arjun Rajeshbhai Modi',
      mobile: '9234567891',
      dob: '05/10/2018',
      age: '6Y, 8M, 21D',
      type: 'Consultation',
      payment: 'Online',
      amount: '₹1200'
    },
    {
      id: '230919',
      name: 'Diya Prakashbhai Shah',
      mobile: '9345678912',
      dob: '23/09/2019',
      age: '5Y, 9M, 3D',
      type: 'Surgery',
      payment: 'Cash',
      amount: '₹15000'
    },
    {
      id: '171221',
      name: 'Karan Nitinbhai Desai',
      mobile: '9456789123',
      dob: '17/12/2021',
      age: '3Y, 6M, 9D',
      type: 'Vaccine',
      payment: 'Online',
      amount: '₹750'
    },
    {
      id: '080317',
      name: 'Meera Sureshbhai Pandya',
      mobile: '9567891234',
      dob: '08/03/2017',
      age: '8Y, 3M, 18D',
      type: 'Check-up',
      payment: 'Cash',
      amount: '₹600'
    },
    {
      id: '141122',
      name: 'Rohan Deepakbhai Trivedi',
      mobile: '9678912345',
      dob: '14/11/2022',
      age: '2Y, 7M, 12D',
      type: 'OPD',
      payment: 'Online',
      amount: '₹400'
    },
    {
      id: '260620',
      name: 'Aanya Vikrambhai Patel',
      mobile: '9789123456',
      dob: '26/06/2020',
      age: '4Y, 11M, 30D',
      type: 'Vaccine',
      payment: 'Cash',
      amount: '₹850'
    },
    {
      id: '120819',
      name: 'Dev Hirenbhai Mehta',
      mobile: '9891234567',
      dob: '12/08/2019',
      age: '5Y, 10M, 14D',
      type: 'Consultation',
      payment: 'Online',
      amount: '₹1100'
    },
    {
      id: '190223',
      name: 'Kavya Ashokbhai Joshi',
      mobile: '9912345678',
      dob: '19/02/2023',
      age: '2Y, 4M, 7D',
      type: 'OPD',
      payment: 'Cash',
      amount: '₹320'
    },
    {
      id: '070921',
      name: 'Neel Jitendrabhai Vora',
      mobile: '9123456789',
      dob: '07/09/2021',
      age: '3Y, 9M, 19D',
      type: 'Surgery',
      payment: 'Online',
      amount: '₹8500'
    },
    {
      id: '311018',
      name: 'Prisha Manishbhai Soni',
      mobile: '9234567890',
      dob: '31/10/2018',
      age: '6Y, 7M, 26D',
      type: 'Check-up',
      payment: 'Cash',
      amount: '₹550'
    },
    {
      id: '150422',
      name: 'Shreyas Kamleshbhai Raval',
      mobile: '9345678901',
      dob: '15/04/2022',
      age: '3Y, 2M, 11D',
      type: 'Vaccine',
      payment: 'Online',
      amount: '₹700'
    },
    {
      id: '050820',
      name: 'Tanvi Bhaveshbhai Amin',
      mobile: '9456789012',
      dob: '05/08/2020',
      age: '4Y, 10M, 21D',
      type: 'OPD',
      payment: 'Cash',
      amount: '₹380'
    },
    {
      id: '220119',
      name: 'Yash Saileshbhai Bhatt',
      mobile: '9567890123',
      dob: '22/01/2019',
      age: '6Y, 5M, 4D',
      type: 'Consultation',
      payment: 'Online',
      amount: '₹1300'
    },
    {
      id: '180721',
      name: 'Zara Nareshbhai Chudasama',
      mobile: '9678901234',
      dob: '18/07/2021',
      age: '3Y, 11M, 8D',
      type: 'Surgery',
      payment: 'Cash',
      amount: '₹12000'
    },
    {
      id: '091223',
      name: 'Aarav Mukeshbhai Gandhe',
      mobile: '9789012345',
      dob: '09/12/2023',
      age: '1Y, 6M, 17D',
      type: 'Vaccine',
      payment: 'Online',
      amount: '₹650'
    },
    {
      id: '030617',
      name: 'Ishika Rameshbhai Kothari',
      mobile: '9890123456',
      dob: '03/06/2017',
      age: '7Y, 12M, 23D',
      type: 'Check-up',
      payment: 'Cash',
      amount: '₹480'
    },
    {
      id: '250920',
      name: 'Krish Dineshbhai Upadhyay',
      mobile: '9901234567',
      dob: '25/09/2020',
      age: '4Y, 8M, 31D',
      type: 'OPD',
      payment: 'Online',
      amount: '₹420'
    },
    {
      id: '161018',
      name: 'Mira Jayeshbhai Thakkar',
      mobile: '9012345678',
      dob: '16/10/2018',
      age: '6Y, 8M, 10D',
      type: 'Consultation',
      payment: 'Cash',
      amount: '₹950'
    },
    {
      id: '110521',
      name: 'Om Hareshbhai Panchal',
      mobile: '9123456780',
      dob: '11/05/2021',
      age: '4Y, 1M, 15D',
      type: 'Vaccine',
      payment: 'Online',
      amount: '₹775'
    },
    {
      id: '290822',
      name: 'Saanvi Kuldipbhai Dalal',
      mobile: '9234567891',
      dob: '29/08/2022',
      age: '2Y, 9M, 27D',
      type: 'Surgery',
      payment: 'Cash',
      amount: '₹18000'
    }
  ];

  const filteredData = paymentData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    // You can add date filtering logic here when implementing date picker functionality
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calculate payment summary
  const calculateSummary = () => {
    const total = paymentData.reduce((sum, item) => {
      const amount = parseInt(item.amount.replace('₹', '').replace(',', ''));
      return sum + amount;
    }, 0);

    const online = paymentData
      .filter(item => item.payment === 'Online')
      .reduce((sum, item) => {
        const amount = parseInt(item.amount.replace('₹', '').replace(',', ''));
        return sum + amount;
      }, 0);

    const cash = paymentData
      .filter(item => item.payment === 'Cash')
      .reduce((sum, item) => {
        const amount = parseInt(item.amount.replace('₹', '').replace(',', ''));
        return sum + amount;
      }, 0);

    return { total, online, cash };
  };

  const summary = calculateSummary();

  const handleViewDetails = (patientId: string) => {
    navigate(`/patient/${patientId}/summary`);
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/patient/${patientId}`);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Search and Filters Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search by Name */}
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            {/* Date Range */}
            <div className="relative min-w-[300px]">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="DD/MM/YYYY ~ DD/MM/YYYY"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Payment Summary */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="font-medium">
              Total: <span className="text-blue-600">₹{summary.total.toLocaleString()}/-</span>
            </span>
            <span className="font-medium">
              Online: <span className="text-green-600">₹{summary.online.toLocaleString()}/-</span>
            </span>
            <span className="font-medium">
              Cash: <span className="text-orange-600">₹{summary.cash.toLocaleString()}/-</span>
            </span>
          </div>
        </div>

        {/* Payment Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handlePatientClick(item.id)}
                        className="text-blue-600 font-medium hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.mobile}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.dob}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
                  {startIndex + 1}-{Math.min(endIndex, filteredData.length)} of {filteredData.length}
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
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
