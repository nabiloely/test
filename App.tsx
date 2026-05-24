import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import DashboardPage from './pages/DashboardPage';
import PropertiesPage from './pages/PropertiesPage';
import BookingsPage from './pages/BookingsPage';
import CustomersPage from './pages/CustomersPage';
import RevenuePage from './pages/RevenuePage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import MaintenancePage from './pages/MaintenancePage';
import OdooSyncPage from './pages/OdooSyncPage';
import SettingsPage from './pages/SettingsPage';
import { DashboardFilters } from './types';

const defaultFilters: DashboardFilters = {
  dateRange: 'month',
  propertyType: 'all',
  location: 'all',
  status: 'all',
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<DashboardFilters>(defaultFilters);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'properties':
        return <PropertiesPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'customers':
        return <CustomersPage />;
      case 'revenue':
        return <RevenuePage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'odoo-sync':
        return <OdooSyncPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:mr-0">
        {/* Header */}
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          filters={filters}
          onFilterChange={setFilters}
        />
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4" dir="rtl">
            <p className="text-sm text-gray-500">
              © ٢٠٢٦ نظام حجز العقارات. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>إصدار ١.٠.٠</span>
              <span>•</span>
              <span>متصل بأودو</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
