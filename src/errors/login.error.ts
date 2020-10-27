import { BAD_REQUEST } from "http-status-codes";
import { HttpError } from "./http.error";

export class LoginError extends HttpError {
  constructor() {
    super("Invalid email or password", BAD_REQUEST);
  }
}
