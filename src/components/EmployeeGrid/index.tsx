import { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeDarkBlue,
  ColDef,
} from 'ag-grid-community';
import { Employee } from '../../types';
import {
  EmployeeCellRenderer,
  SalaryCellRenderer,
  RatingCellRenderer,
  StatusCellRenderer,
  SkillsCellRenderer,
  DateCellRenderer,
  ProjectsCellRenderer,
} from './renderers';

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue).withParams({
  fontFamily: 'Inter, sans-serif',
  headerFontSize: 12,
  fontSize: 13,
  accentColor: '#6366f1',
  borderRadius: 2,
  wrapperBorderRadius: 16,
  rowHoverColor: 'rgba(255, 255, 255, 0.04)',
});

interface EmployeeGridProps {
  data: Employee[];
}

const EmployeeGrid = ({ data }: EmployeeGridProps) => {
  const gridRef = useRef<AgGridReact<Employee>>(null);
  const [quickFilter, setQuickFilter] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showFloatingFilters, setShowFloatingFilters] = useState(false);

  const departments = useMemo(() => {
    const depts = Array.from(new Set(data.map((e) => e.department))).sort();
    return ['All', ...depts];
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedDepartment === 'All') return data;
    return data.filter((e) => e.department === selectedDepartment);
  }, [data, selectedDepartment]);

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      {
        headerName: 'Employee',
        field: 'firstName',
        cellRenderer: EmployeeCellRenderer,
        minWidth: 260,
        flex: 2,
        filter: 'agTextColumnFilter',
        valueGetter: (params) => {
          if (!params.data) return '';
          return `${params.data.firstName} ${params.data.lastName}`;
        }
      },
      {
        headerName: 'Department',
        field: 'department',
        minWidth: 150,
        flex: 1,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Position',
        field: 'position',
        minWidth: 180,
        flex: 1.5,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Salary',
        field: 'salary',
        cellRenderer: SalaryCellRenderer,
        minWidth: 130,
        flex: 1,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Rating',
        field: 'performanceRating',
        cellRenderer: RatingCellRenderer,
        minWidth: 160,
        flex: 1,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Projects',
        field: 'projectsCompleted',
        cellRenderer: ProjectsCellRenderer,
        minWidth: 140,
        flex: 1,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Location',
        field: 'location',
        minWidth: 120,
        flex: 1,
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'Hire Date',
        field: 'hireDate',
        cellRenderer: DateCellRenderer,
        minWidth: 140,
        flex: 1,
        filter: 'agDateColumnFilter',
        comparator: (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime(),
      },
      {
        headerName: 'Status',
        field: 'isActive',
        cellRenderer: StatusCellRenderer,
        minWidth: 110,
        flex: 0.8,
      },
      {
        headerName: 'Skills',
        field: 'skills',
        cellRenderer: SkillsCellRenderer,
        minWidth: 280,
        flex: 2,
        sortable: false,
      },
      {
        headerName: 'Age',
        field: 'age',
        minWidth: 80,
        flex: 0.6,
        filter: 'agNumberColumnFilter',
      },
      {
        headerName: 'Manager',
        field: 'manager',
        minWidth: 160,
        flex: 1,
        filter: 'agTextColumnFilter',
        valueFormatter: (params) => params.value || '—',
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: showFloatingFilters,
      cellStyle: { display: 'flex', alignItems: 'center' },
    }),
    [showFloatingFilters],
  );

  const onGridReady = useCallback((params: any) => {
    params.api.sizeColumnsToFit();
  }, []);

  const onExportCsv = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.exportDataAsCsv({
        fileName: 'employee_data.csv',
      });
    }
  }, []);

  const onResetFilters = useCallback(() => {
    if (gridRef.current?.api) {
      gridRef.current.api.setFilterModel(null);
      setQuickFilter('');
      setSelectedDepartment('All');
    }
  }, []);

  const getRowId = useCallback((params: any) => String(params.data.id), []);

  return (
    <div className="animate-[fadeInUp_0.5s_ease_0.2s_both] bg-slate-900/40 backdrop-blur-[20px] border border-white/10 rounded-[20px] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5">
        <div className="flex flex-col gap-3 flex-1 w-full">
          <div className="relative max-w-full md:max-w-[400px]">
            <svg
              className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-500 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              id="quick-search"
              className="w-full py-[0.7rem] pr-4 pl-[2.75rem] bg-white/5 border border-white/10 rounded-xl text-slate-200 text-[0.9rem] transition-all duration-300 outline-none focus:border-indigo-500/50 focus:bg-white/10 focus:ring-[3px] focus:ring-indigo-500/10 placeholder:text-slate-500"
              placeholder="Search employees..."
              value={quickFilter}
              onChange={(e) => setQuickFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.map((dept) => {
              const isActive = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  className={`px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[0.8rem] font-medium cursor-pointer transition-all duration-300 w-[110px] text-center hover:bg-white/10 hover:text-slate-200 hover:border-white/20 ${isActive ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30' : 'text-slate-400'}`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 items-center w-full md:w-auto justify-end">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-[0.85rem] font-medium cursor-pointer transition-all duration-300 hover:bg-white/10 hover:text-slate-200 hover:border-white/20" onClick={() => setShowFloatingFilters(!showFloatingFilters)} title="Toggle Filters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filters {showFloatingFilters ? 'On' : 'Off'}
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-[0.85rem] font-medium cursor-pointer transition-all duration-300 hover:bg-white/10 hover:text-slate-200 hover:border-white/20" onClick={onResetFilters} title="Reset Filters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-[0.85rem] font-medium cursor-pointer transition-all duration-300 hover:bg-emerald-500/15 hover:text-emerald-400 hover:border-emerald-500/30" onClick={onExportCsv} title="Export CSV">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* AG Grid */}
      <div style={{ width: '100%' }}>
        <AgGridReact<Employee>
          ref={gridRef}
          theme={myTheme}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilter}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20]}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          getRowId={getRowId}
          rowHeight={76}
          headerHeight={48}
          floatingFiltersHeight={40}
          enableCellTextSelection={true}
        />
      </div>

      {/* Footer info */}
      <div className="flex flex-col md:flex-row justify-between items-center text-center py-4 mt-3 gap-2">
        <span className="text-[0.85rem] text-slate-400 font-medium">
          Showing {filteredData.length} of {data.length} employees
        </span>
        <span className="text-[0.8rem] text-slate-500">
          💡 Click column headers to sort • Use floating filters to search columns
        </span>
      </div>
    </div>
  );
};

export default EmployeeGrid;
