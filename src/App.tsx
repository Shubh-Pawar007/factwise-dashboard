import { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import StatsBar from './components/StatsBar';
import EmployeeGrid from './components/EmployeeGrid';
import ProfileDrawer from './components/ProfileDrawer';
import { employeeData } from './data/employees';
import { Employee } from './types';
import './index.css';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // Let the animation finish before clearing the data
    setTimeout(() => setSelectedEmployee(null), 300);
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-hidden bg-slate-950">
        {/* Parallax Background Blobs */}
        <div 
          className="fixed rounded-full blur-[120px] opacity-15 pointer-events-none w-[600px] h-[600px] bg-indigo-500 -top-[200px] -right-[100px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)` }}
        />
        <div 
          className="fixed rounded-full blur-[120px] opacity-15 pointer-events-none w-[500px] h-[500px] bg-purple-500 -bottom-[100px] -left-[150px] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)` }}
        />
        <div 
          className="fixed rounded-full blur-[120px] opacity-15 pointer-events-none w-[400px] h-[400px] bg-cyan-500 top-[40%] left-[50%] transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${mousePos.x * -30}px, ${mousePos.y * 30}px) translate(-50%, -50%)` }}
        />

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-12">
          {/* Header */}
          <header className="mb-4 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[22px] h-[22px]">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-br from-slate-200 to-white bg-clip-text text-transparent leading-tight tracking-tight">People Dashboard</h1>
                  <p className="text-sm text-slate-400 mt-0.5">Employee Analytics & Management</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Data
                </div>
              </div>
            </div>
          </header>

          {/* Stats */}
          <StatsBar data={employeeData} />

          {/* Grid */}
          <EmployeeGrid data={employeeData} onRowSelect={handleRowClick} />
        </div>

        {/* Drawer overlay */}
        <ProfileDrawer isOpen={isDrawerOpen} onClose={closeDrawer} employee={selectedEmployee} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
