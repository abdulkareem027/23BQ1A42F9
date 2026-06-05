import api from "./api";
import { Log } from "./logger";

export const registerUser = async (data) => {
  try {
    const response = await api.post(
      "/register",
      data
    );

    Log(
      "frontend",
      "info",
      "auth",
      "Registration success"
    );

    return response.data;
  } catch (error) {
    Log(
      "frontend",
      "error",
      "auth",
      "Registration failed"
    );

    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post(
      "/auth",
      data
    );

    const token =
      response.data.access_token ||
      response.data.token ||
      response.data.authToken ||
      response.data.authorization;

    if (!token) {
      throw new Error("Authentication token not returned by server");
    }

    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    throw error;
  }
};