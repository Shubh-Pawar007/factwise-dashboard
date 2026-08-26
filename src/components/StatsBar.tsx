import { useMemo } from 'react';
import { Employee } from '../types';

const StatsBar = ({ data }: { data: Employee[] }) => {
  const stats = useMemo(() => {
    const totalEmployees = data.length;
    const activeEmployees = data.filter((e) => e.isActive).length;
    const avgSalary = data.reduce((sum, e) => sum + e.salary, 0) / totalEmployees;
    const avgRating = data.reduce((sum, e) => sum + e.performanceRating, 0) / totalEmployees;
    const totalProjects = data.reduce((sum, e) => sum + e.projectsCompleted, 0);

    return [
      { icon: '👥', value: totalEmployees, label: 'Total Employees' },
      { icon: '✅', value: activeEmployees, label: 'Active' },
      {
        icon: '💰',
        value: new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(avgSalary),
        label: 'Avg Salary',
      },
      { icon: '⭐', value: avgRating.toFixed(1), label: 'Avg Rating' },
      { icon: '📊', value: totalProjects, label: 'Total Projects' },
    ];
  }, [data]);

  return (
    <div className="flex flex-wrap gap-4 p-0 mb-6 border-b-0">
      {stats.map((stat, index) => (
        <div 
          className="flex items-center gap-2.5 bg-slate-900/40 backdrop-blur-[20px] border border-white/10 rounded-full px-5 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(99,102,241,0.2)]"
          key={index}
        >
          <span className="text-[1.1rem] leading-none">{stat.icon}</span>
          <span className="text-[0.95rem] font-bold bg-gradient-to-br from-slate-200 to-white bg-clip-text text-transparent leading-none tracking-normal">{stat.value}</span>
          <span className="text-[0.75rem] text-slate-400 font-medium uppercase tracking-[0.05em] leading-none">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
