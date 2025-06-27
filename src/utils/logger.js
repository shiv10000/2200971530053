// Custom logging middleware
const logger = {
    log: (message, data) => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        message,
        data
      };
      // In a real app, this would send to a logging service
      localStorage.setItem('log_' + Date.now(), JSON.stringify(logEntry));
    },
    error: (message, error) => {
      const logEntry = {
        timestamp: new Date().toISOString(),
        level: 'ERROR',
        message,
        error: error?.message || String(error)
      };
      localStorage.setItem('log_' + Date.now(), JSON.stringify(logEntry));
    }
  };
  
  export default logger;