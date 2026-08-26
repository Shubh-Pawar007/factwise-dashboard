import { useMemo } from 'react';
import './StatsBar.css';

const StatsBar = ({ data }) => {
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
    <div className="stats-bar">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <span className="stat-icon">{stat.icon}</span>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
