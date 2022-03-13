class ValidationError extends Error {
    constructor(...args) {
        super(...args);

        Error.captureStackTrace(this, ValidationError);
        // name == 'Error'
        this.name = 'ValidationError';
    }
}

// handle custom errors with error.name