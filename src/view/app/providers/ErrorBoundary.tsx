import type { ErrorInfo } from 'react';
import { Component } from 'react';

import PageNotFound from '@/view/pages/notFound/NotFound';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
    console.error('Ошибка была отловлена ErrorBoundary/nИнформация:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <PageNotFound />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
