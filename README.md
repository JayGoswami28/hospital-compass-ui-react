
# Hospital Management System

A modern, comprehensive Hospital Management System built with React, TypeScript, and Tailwind CSS. This system provides a complete solution for managing hospital operations including patient records, appointments, staff management, and more.

## 🚀 Features

### Core Functionality
- **Admin Dashboard** - Overview of hospital operations with patient statistics and payment summaries
- **Patient Management** - Comprehensive patient records with search and filtering
- **Appointment Booking** - Schedule and manage patient appointments with calendar integration
- **Staff Management** - User roles, permissions, and staff information
- **Bed Management** - Track bed availability and patient assignments
- **Vaccine Management** - Inventory tracking with low-stock alerts
- **Receptionist Dashboard** - Quick check-in and appointment management

### Authentication & Security
- Secure login system with session management
- Role-based access control
- Password reset functionality
- Protected routes and user authentication

### User Interface
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- **Modern UI** - Clean, professional interface with medical-grade color scheme
- **Accessibility** - WCAG 2.1 compliant with proper contrast and keyboard navigation
- **Interactive Elements** - Hover effects, transitions, and micro-interactions

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom medical color palette
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router v6 with protected routes
- **State Management**: React Context API
- **Build Tool**: Vite for fast development and building
- **UI Components**: Custom components with shadcn/ui integration

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hospital-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:8080`
   - Use the demo credentials to log in:
     - **Email**: admin@hospital.com
     - **Password**: admin123

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (Sidebar, Header)
│   └── Common/          # Common components (Table, Card)
├── context/             # React Context providers
├── data/                # Mock data and constants
├── pages/               # Application pages/routes
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6 (Medical blue for primary actions)
- **Light Purple**: #f3e8ff (Header backgrounds and highlights)
- **Success Green**: #10b981 (Success states and available items)
- **Warning Yellow**: #f59e0b (Warning states and low stock)
- **Error Red**: #ef4444 (Error states and critical alerts)
- **Neutral Gray**: #f8fafc (Background and subtle elements)

### Typography
- **Primary Font**: Inter (Google Fonts)
- Clean, readable sans-serif optimized for medical interfaces

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

The sidebar collapses to a hamburger menu on mobile devices for optimal space utilization.

## 🔐 Authentication

The system includes a complete authentication flow:

- **Login Page** with email/password validation
- **Forgot Password** with email reset functionality
- **Change Password** with strength validation
- **Session Management** with localStorage persistence
- **Protected Routes** requiring authentication

### Demo Credentials
- **Administrator**: admin@hospital.com / admin123

## 📊 Key Pages & Features

### 1. Admin Dashboard
- Patient statistics and payment summaries
- Searchable patient records table
- Pagination and filtering
- Quick action buttons

### 2. Role Management
- Create, edit, and delete user roles
- Role descriptions and permissions
- Search and filter functionality

### 3. Vaccine Management
- Inventory tracking with quantities
- Expiry date monitoring
- Low stock alerts and reorder notifications
- Status indicators (In Stock, Low Stock, Critical)

### 4. Bed Management
- Real-time bed availability
- Patient assignment and release
- Room number tracking
- Status filtering (Available, Occupied, Maintenance)

### 5. Appointment Booking
- Calendar and list view options
- Doctor and time slot selection
- Patient information forms
- Appointment status tracking

### 6. User Management
- Staff profiles with role assignments
- Contact information management
- Search and role-based filtering
- User creation and editing

## 🧪 Mock Data

The application includes comprehensive mock data for demonstration:
- Sample patient records
- Hospital staff information
- Appointment schedules
- Vaccine inventory
- Bed assignments

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings (auto-detected for Vite)
3. Deploy with automatic CI/CD

### Netlify
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Traditional Hosting
1. Run `npm run build`
2. Upload `dist` folder contents to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please create an issue in the GitHub repository or contact the development team.

## 🔄 Future Enhancements

- Integration with real backend APIs
- Advanced reporting and analytics
- Notification system
- Mobile app development
- Multi-language support
- Advanced search capabilities
- Export functionality for reports

---

Built with ❤️ for modern healthcare management
