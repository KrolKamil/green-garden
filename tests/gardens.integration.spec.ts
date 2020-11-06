import { expect } from "chai";
import "mocha";
import * as request from "supertest";

describe("/api/gardens integration", () => {
  it("test example", async () => {
    return request(global.container.resolve("app"))
      .get("/health")
      .expect(200)
  });
});
