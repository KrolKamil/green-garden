import { HttpError } from "./http.error";
import { BAD_REQUEST } from "http-status-codes";

export class LoginError extends HttpError {
  constructor() {
    super("Invalid email or password", BAD_REQUEST);
  }
}
