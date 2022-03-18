import supertest from "supertest";
import app from "../server.js";

describe("should handle get request", () => {
    test("should return 200 status", (done) => {
        supertest(app)
            .get("/users")
            .expect(200, done);
    });
});