import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          color: '#f87171',
          background: '#1e293b',
          borderRadius: '12px',
          margin: '2rem',
          fontFamily: 'monospace',
        }}>
          <h2 style={{ marginBottom: '1rem' }}>⚠️ Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#94a3b8' }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem', color: '#64748b', marginTop: '1rem' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
