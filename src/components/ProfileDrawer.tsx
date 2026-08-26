import { useEffect, useState } from 'react';
import { Employee } from '../types';
import { getInitials, getDepartmentColor } from '../utils/formatters';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const ProfileDrawer = ({ isOpen, onClose, employee }: ProfileDrawerProps) => {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setIsRendered(true);
    else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isRendered || !employee) return null;

  const colors = getDepartmentColor(employee.department);
  const initials = getInitials(employee.firstName, employee.lastName);
  const ratingPct = (employee.performanceRating / 5) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border-l border-white/10 shadow-2xl p-6 md:p-8 transform transition-transform duration-300 ease-out pointer-events-auto flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header (Avatar & Name) */}
        <div className="flex flex-col items-center mt-4 mb-8">
          <div 
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold shadow-2xl mb-4"
            style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
          >
            {initials}
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{employee.firstName} {employee.lastName}</h2>
          <p className="text-slate-400 font-medium">{employee.position}</p>
          <div className="mt-3 px-4 py-1.5 rounded-full text-sm font-semibold border" style={{ background: colors.bg, color: colors.text, borderColor: colors.border }}>
            {employee.department}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Performance</span>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-white leading-none">{employee.performanceRating.toFixed(1)}</span>
              <span className="text-slate-500 text-sm leading-snug">/ 5.0</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-auto">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${ratingPct}%` }} />
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Projects</span>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 leading-none mb-1">
              {employee.projectsCompleted}
            </span>
            <span className="text-slate-400 text-sm mt-auto">Completed</span>
          </div>
        </div>

        {/* Details List */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-5">
            <div>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-2">Contact Info</span>
              <div className="flex items-center gap-3 text-slate-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                {employee.email}
              </div>
            </div>
            
            <div>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-2">Location</span>
              <div className="flex items-center gap-3 text-slate-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {employee.location}
              </div>
            </div>

            <div>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-2">Manager</span>
              <div className="flex items-center gap-3 text-slate-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {employee.manager || '—'}
              </div>
            </div>

            <div>
              <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-3">Core Skills</span>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
