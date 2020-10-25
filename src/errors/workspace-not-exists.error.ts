import { HttpError } from "./http.error";
import { BAD_REQUEST } from "http-status-codes";

export class WorkspaceNotExistsError extends HttpError {
  constructor() {
    super("Workspace does not exist", BAD_REQUEST);
  }
}
