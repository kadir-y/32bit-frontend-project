
/**
 * Returns the status code from the error response, or -1 if no response is available.
 *
 * @param {Error} error - The error object.
 * @returns {number} The status code from the error response, or -1 if no response is available.
 */
export default function getErrorStatusCode (error) {
  return error.response && error.response.status
  ? error.response.status : -1;
}
