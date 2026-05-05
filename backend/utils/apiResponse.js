export class ApiResponse {
  constructor(success = true, message = "", data = null, statusCode = 200) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
  static success(res, data, message = "Success", statusCode = 200) {
    return res
      .status(statusCode)
      .json(new ApiResponse(true, message, data, statusCode));
  }
  static error(res, message = "Error", statusCode = 500) {
    return res
      .status(statusCode)
      .json(new ApiResponse(false, message, null, statusCode));
  }
}
