import axios, { AxiosError } from "axios";

export const errorHandler = (
  error: Error | AxiosError,
): { message: string; status: number } => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data.message,
      status: error.response?.data.statusCode,
    };
  } else {
    return {
      message: error.message,
      status: 500,
    };
  }
};
