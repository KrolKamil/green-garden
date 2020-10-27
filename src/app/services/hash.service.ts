import { hash, compare } from "bcryptjs";
import { AppConfig } from "../../../config/app";

interface HashServiceDependencies {
  appConfig: AppConfig;
}

export class HashService {
  constructor(private dependencies: HashServiceDependencies) {}

  hash(target: string) {
    const { hashRounds } = this.dependencies.appConfig;
    return hash(target, hashRounds);
  }

  async compare(target: string, hashed: string) {
    try {
      return compare(target, hashed);
    } catch (e) {
      return false;
    }
  }
}
