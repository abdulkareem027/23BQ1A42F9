import api from "./api";
import { Log } from "./logger";

const validFilters = ["", "all", "priority"];

export const getNotifications = async (
  page,
  limit,
  type
) => {
  if (type && !validFilters.includes(type)) {
    Log(
      "frontend",
      "warn",
      "component",
      "Invalid filter selected"
    );
  }
  try {
    const response = await api.get(
      "/notifications",
      {
        params: {
          page,
          limit,
          notification_type: type,
        },
      }
    );

    Log(
      "frontend",
      "info",
      "api",
      "Notifications fetched"
    );

    return response.data.notifications;
  } catch (error) {
    Log(
      "frontend",
      "error",
      "api",
      error.message
    );

    throw error;
  }
};