// Central error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error for server-side visibility
  console.error(err.stack);
  
  // Default error status and message
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;