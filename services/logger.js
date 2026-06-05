import api from "./api";

export const Log = async (
  stack,
  level,
  packageName,
  message
) => {
  try {
    await api.post("/logs", {
      stack,
      level,
      package: packageName,
      message,
    });
  } catch (err) {
    console.error("Logger failed", err);
  }
};