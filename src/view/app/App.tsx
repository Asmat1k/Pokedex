import ErrorBoundary from './providers/ErrorBoundary';
import { ReactRouterProvider } from './providers/ReactRouterProvider';
import './styles/null.scss';
import './styles/styles.scss';

const App = () => {
  return (
    <ErrorBoundary>
      <ReactRouterProvider />
    </ErrorBoundary>
  );
};

export { App };
