import ErrorBoundary from './components/ErrorBoundary';
import StatsBar from './components/StatsBar';
import EmployeeGrid from './components/EmployeeGrid';
import { employeeData } from './data/employees';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background gradient blobs using arbitrary values for animation */}
        <div className="fixed rounded-full blur-[120px] opacity-15 pointer-events-none w-[600px] h-[600px] bg-indigo-500 -top-[200px] -right-[100px] animate-[float1_20s_ease-in-out_infinite]" />
        <div className="fixed rounded-full blur-[120px] opacity-15 pointer-events-none w-[500px] h-[500px] bg-purple-500 -bottom-[100px] -left-[150px] animate-[float2_25s_ease-in-out_infinite]" />
        <div className="fixed rounded-full blur-[120px] opacity-15 pointer-events-none w-[400px] h-[400px] bg-cyan-500 top-[40%] left-[50%] animate-[float3_22s_ease-in-out_infinite]" />

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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
    </ErrorBoundary>
  );
}

export default App;
