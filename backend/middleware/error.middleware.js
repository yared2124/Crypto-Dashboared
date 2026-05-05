import { HTTP_STATUS } from "../config/constants.js";

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || HTTP_STATUS.SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  res
    .status(status)
    .json({
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};

export default errorMiddleware;
