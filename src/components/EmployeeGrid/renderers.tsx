import { ICellRendererParams } from 'ag-grid-community';
import { Employee } from '../../types';
import { getDepartmentColor, getRatingColor, formatCurrency, formatDate, getInitials } from '../../utils/formatters';

export const EmployeeCellRenderer = (params: ICellRendererParams<Employee>) => {
  if (!params.data) return null;
  const { firstName, lastName, email } = params.data;
  const initials = getInitials(firstName, lastName);
  const colors = getDepartmentColor(params.data.department);
  return (
    <div className="flex items-center gap-3 py-1 px-2 md:pl-2 md:pr-5 group w-full h-full">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-[0.8rem] font-bold shrink-0 tracking-[0.02em] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.15] group-hover:-rotate-3"
        style={{
          background: colors.bg,
          color: colors.text,
          border: `1px solid ${colors.border}`,
          boxShadow: `0 0 0 ${colors.text}00`,
        }}
      >
        {initials}
      </div>
      <div className="flex flex-col justify-center items-start text-left gap-[0.15rem] min-w-0">
        <span className="font-semibold text-slate-200 text-[0.9rem] whitespace-nowrap overflow-hidden text-ellipsis leading-[1.2]">{firstName} {lastName}</span>
        <span className="text-[0.75rem] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis leading-[1.2]">{email}</span>
      </div>
    </div>
  );
};

export const SalaryCellRenderer = (params: ICellRendererParams<Employee, number>) => (
  <span className="font-semibold text-slate-200 tabular-nums text-[0.9rem]">
    {params.value != null ? formatCurrency(params.value) : ''}
  </span>
);

export const RatingCellRenderer = (params: ICellRendererParams<Employee, number>) => {
  if (params.value == null) return null;
  const rating = params.value;
  const color = getRatingColor(rating);
  const percentage = (rating / 5) * 100;
  return (
    <div className="flex items-center gap-3 w-full h-full">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
      <span className="font-bold text-[0.85rem] min-w-[28px] text-right tabular-nums" style={{ color }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export const StatusCellRenderer = (params: ICellRendererParams<Employee>) => {
  if (!params.data) return null;
  const isActive = params.data.isActive;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.8rem] font-semibold ${isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current ${isActive ? 'animate-pulse' : 'opacity-50'}`} />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
};

export const SkillsCellRenderer = (params: ICellRendererParams<Employee, string[]>) => {
  const skills = params.value || [];
  return (
    <div className="flex flex-wrap gap-1 items-center py-1 max-h-[48px] overflow-hidden">
      {skills.map((skill: string, i: number) => (
        <span key={i} className="inline-flex px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[0.65rem] font-medium text-indigo-300 whitespace-nowrap transition-all duration-300 hover:bg-indigo-500/25 hover:border-indigo-500/50 hover:text-indigo-200 hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
          {skill}
        </span>
      ))}
    </div>
  );
};

export const DateCellRenderer = (params: ICellRendererParams<Employee, string>) => (
  <span className="text-slate-400 text-[0.85rem]">
    {params.value ? formatDate(params.value) : ''}
  </span>
);

export const ProjectsCellRenderer = (params: ICellRendererParams<Employee, number>) => {
  if (params.value == null) return null;
  const val = params.value;
  const max = 25;
  const pct = Math.min((val / max) * 100, 100);
  return (
    <div className="flex items-center gap-3 w-full h-full">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.4)] bg-[length:300%_100%] animate-[gradientPan_4s_linear_infinite] transition-[width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ width: `${pct}%` }} />
      </div>
      <span className="font-semibold text-[0.85rem] text-purple-300 min-w-[20px] text-right">{val}</span>
    </div>
  );
};
