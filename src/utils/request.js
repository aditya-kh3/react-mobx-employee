/**
 * Axios Request Wrapper
 * ---------------------
 *
 * @author  Sheharyar Naseer (@sheharyarn)
 * @license MIT
 *
 */

import axios from "axios";
import commonStore from "../stores/commonStore";

/**
 * Create an Axios Client with defaults
 */

const client = axios.create({
  baseURL: "http://dummy.restapiexample.com"
});

/**
 * Request Wrapper with default success/error actions
 */
const request = function(options, auth = false) {
  options.headers = {
    "Content-Type": "application/json"
  };
  if (auth) {
    options.headers.Authorization = `Bearer ${commonStore.token}`;
  }

  const onSuccess = function(response) {
    console.debug("Request Successful!", response);
    return response.data;
  };

  const onError = function(error) {
    console.error("Request Failed:", error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      if (process.env.NODE_ENV !== "production") {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      }
      /** If token expired, remove jwt */
      if (error.response.data) {
        if (error.response.data[0] === "Token has expired") {
          commonStore.setToken(undefined);
        }
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
