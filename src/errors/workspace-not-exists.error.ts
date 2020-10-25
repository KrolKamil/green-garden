import { BAD_REQUEST } from "http-status-codes";
import { HttpError } from "./http.error";

export class WorkspaceNotExistsError extends HttpError {
  constructor() {
    super("Workspace does not exist", BAD_REQUEST);
  }
}
