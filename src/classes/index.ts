import { NextResponse as res } from "next/server";

class HttpMethodHandler {
  // private static readonly DEFAULT_SUCCESS_MESSAGE = "Request successful";
  private static readonly DEFAULT_ERROR_MESSAGE = "An error occurred";

  static sendSuccess(data?: unknown, statusCode?: number) {
    // const responseMessage = message || this.DEFAULT_SUCCESS_MESSAGE;
    return res.json(data, { status: statusCode || 200 });
  }

  static sendError(statusCode: number, message?: string) {
    const responseMessage = message || this.DEFAULT_ERROR_MESSAGE;
    return res.json(
      { success: false, message: responseMessage },
      { status: statusCode },
    );
  }

  // Handle a 404 Not Found response
  static sendNotFound(message?: string) {
    return this.sendError(404, message || "Not Found");
  }

  // Handle a 400 Bad Request response
  static sendBadRequest(message?: string) {
    return this.sendError(400, message || "Bad Request");
  }

  // Handle a 500 Internal Server Error response
  static sendInternalServerError(message?: string) {
    return this.sendError(500, message || "Internal Server Error");
  }
}

export default HttpMethodHandler;
