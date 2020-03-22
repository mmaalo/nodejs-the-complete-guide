module.exports = (statuscode, err) => {
    const error = new Error(err);
    error.httpStatusCode = statuscode;
    return error;
}