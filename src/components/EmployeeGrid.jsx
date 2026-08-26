import { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { getDepartmentColor, getRatingColor, formatCurrency, formatDate, getInitials } from '../utils/formatters';
import './EmployeeGrid.css';

ModuleRegistry.registerModules([AllCommunityModule]);

/* ── Custom Cell Renderers ─────────────────────────────────── */

const EmployeeCellRenderer = (params) => {
  const { firstName, lastName, email } = params.data;
  const initials = getInitials(firstName, lastName);
  const colors = getDepartmentColor(params.data.department);
  return (
    <div className="employee-cell">
      <div className="avatar" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
        {initials}
      </div>
      <div className="employee-info">
        <span className="employee-name">{firstName} {lastName}</span>
        <span className="employee-email">{email}</span>
      </div>
    </div>
  );
};

const DepartmentCellRenderer = (params) => {
  const colors = getDepartmentColor(params.value);
  return (
    <span className="department-badge" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
      {params.value}
    </span>
  );
};

const SalaryCellRenderer = (params) => (
  <span className="salary-cell">{formatCurrency(params.value)}</span>
);

const RatingCellRenderer = (params) => {
  const rating = params.value;
  const color = getRatingColor(rating);
  const percentage = (rating / 5) * 100;
  return (
    <div className="rating-cell">
      <div className="rating-bar-bg">
        <div className="rating-bar-fill" style={{ width: `${percentage}%`, background: color }} />
      </div>
      <span className="rating-value" style={{ color }}>{rating.toFixed(1)}</span>
    </div>
  );
};

const StatusCellRenderer = (params) => (
  <span className={`status-badge ${params.value ? 'active' : 'inactive'}`}>
    <span className="status-dot" />
    {params.value ? 'Active' : 'Inactive'}
  </span>
);

const SkillsCellRenderer = (params) => (
  <div className="skills-cell">
    {params.value.map((skill, i) => (
      <span key={i} className="skill-tag">{skill}</span>
    ))}
  </div>
);

const DateCellRenderer = (params) => (
  <span className="date-cell">{formatDate(params.value)}</span>
);

const ProjectsCellRenderer = (params) => {
  const val = params.value;
  const max = 25;
  const pct = Math.min((val / max) * 100, 100);
  return (
    <div className="projects-cell">
      <div className="projects-bar-bg">
        <div className="projects-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="projects-value">{val}</span>
    </div>
  );
};

/* ── Main Grid Component ───────────────────────────────────── */

const EmployeeGrid = ({ data }) => {
  const gridRef = useRef(null);
  const [quickFilter, setQuickFilter] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = useMemo(() => {
    const depts = [...new Set(data.map((e) => e.department))].sort();
    return ['All', ...depts];
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedDepartment === 'All') return data;
    return data.filter((e) => e.department === selectedDepartment);
  }, [data, selectedDepartment]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: 'Employee',
        field: 'firstName',
        cellRenderer: EmployeeCellRenderer,
        minWidth: 260,
        flex: 2,
        filter: 'agTextColumnFilter',
        valueGetter: (params) => `${params.data.firstName} ${params.data.lastName}`,
        comparator: (a, b) => a.localeCompare(b),
      },
      {
        headerName: 'Department',
        field: 'department',
        cellRenderer: DepartmentCellRenderer,
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
        comparator: (a, b) => a - b,
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
        comparator: (a, b) => new Date(a) - new Date(b),
      },
      {
        headerName: 'Status',
        field: 'isActive',
        cellRenderer: StatusCellRenderer,
        minWidth: 110,
        flex: 0.8,
        filter: 'agTextColumnFilter',
        valueGetter: (params) => (params.data.isActive ? 'Active' : 'Inactive'),
        valueSetter: () => false,
      },
      {
        headerName: 'Skills',
        field: 'skills',
        cellRenderer: SkillsCellRenderer,
        minWidth: 280,
        flex: 2,
        filter: 'agTextColumnFilter',
        valueGetter: (params) => params.data.skills.join(', '),
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

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      floatingFilter: true,
      animateRows: true,
      cellStyle: { display: 'flex', alignItems: 'center' },
    }),
    [],
  );

  const onGridReady = useCallback((params) => {
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

  const getRowId = useCallback((params) => String(params.data.id), []);

  return (
    <div className="grid-container">
      {/* Toolbar */}
      <div className="grid-toolbar">
        <div className="toolbar-left">
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search employees..."
              value={quickFilter}
              onChange={(e) => setQuickFilter(e.target.value)}
            />
          </div>
          <div className="department-filters">
            {departments.map((dept) => (
              <button
                key={dept}
                className={`dept-filter-btn ${selectedDepartment === dept ? 'active' : ''}`}
                onClick={() => setSelectedDepartment(dept)}
                style={
                  dept !== 'All' && selectedDepartment === dept
                    ? { background: getDepartmentColor(dept).bg, color: getDepartmentColor(dept).text, borderColor: getDepartmentColor(dept).border }
                    : {}
                }
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn" onClick={onResetFilters} title="Reset Filters">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reset
          </button>
          <button className="toolbar-btn export-btn" onClick={onExportCsv} title="Export CSV">
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
      <div className="ag-theme-custom">
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilter}
          animateRows={true}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20]}
          domLayout="autoHeight"
          onGridReady={onGridReady}
          getRowId={getRowId}
          rowHeight={56}
          headerHeight={48}
          floatingFiltersHeight={40}
          suppressMovableColumns={false}
          enableCellTextSelection={true}
        />
      </div>

      {/* Footer info */}
      <div className="grid-footer">
        <span className="footer-info">
          Showing {filteredData.length} of {data.length} employees
        </span>
        <span className="footer-hint">
          💡 Click column headers to sort • Use floating filters to search columns • Drag column borders to resize
        </span>
      </div>
    </div>
  );
};

export default EmployeeGrid;
