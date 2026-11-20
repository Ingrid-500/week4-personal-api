function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    error: {
      status: 404,
      message: `Route ${req.method} ${req.originalUrl} not found`
    }
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  // Express/body-parser reports malformed JSON with status 400 and this type.
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: {
        status: 400,
        message: 'Invalid JSON body. Please send valid JSON.'
      }
    });
  }

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status <= 599
    ? err.status
    : 500;

  return res.status(status).json({
    success: false,
    error: {
      status,
      message: status === 500 ? 'Internal server error' : err.message
    }
  });
}

module.exports = { notFoundHandler, errorHandler };
