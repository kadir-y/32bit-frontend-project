// Import the axios library
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL

// Set the default base URL for axios requests 
axios.defaults.baseURL = baseUrl;

// Export the axios instance
export default axios;