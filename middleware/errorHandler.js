const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    console.error(`[Error] ${message}`);
    res.status(status).json({ message });
  };
  
  export default errorHandler;
  