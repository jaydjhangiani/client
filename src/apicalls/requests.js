import { axiosInstance } from ".";

// get all request for a user
export const GetAllRequestsByUser = async () => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/get-all-requests-by-user"
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

// send a request to another user
export const SendRequest = async (request) => {
  try {
    const { data } = await axiosInstance.post(
      "/api/requests/send-request",
      request
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
