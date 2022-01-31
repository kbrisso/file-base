import React from 'react';
import log from 'loglevel';

type State = {
  error: string | null;
  errorInfo: any | null;
};

type Props = {
  children: any;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    log.error(`error: ${error}`);
    log.error(`errorInfo: ${errorInfo}`);
  }

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
