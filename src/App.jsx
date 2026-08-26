import StatsBar from './components/StatsBar';
import EmployeeGrid from './components/EmployeeGrid';
import { employeeData } from './data/employees';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Background gradient blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>
                <div>
                  <h1 className="app-title">People Dashboard</h1>
                  <p className="app-subtitle">Employee Analytics & Management</p>
                </div>
              </div>
            </div>
            <div className="header-right">
              <div className="header-badge">
                <span className="badge-dot" />
                Live Data
              </div>
            </div>
          </div>
        </header>

        {/* Stats */}
        <StatsBar data={employeeData} />

        {/* Grid */}
        <EmployeeGrid data={employeeData} />
      </div>
    </div>
  );
}

export default App;
