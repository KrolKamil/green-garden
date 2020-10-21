import "mocha";
import { expect } from "chai";
import { TokenService } from "./token.service";
import { AppConfig } from "../../../config/app";

describe("TokenService", () => {
    const fakeAppConfig = {
        accessTokenSecret: 'abc',
        refreshTokenSecret: '123'
    } as AppConfig;
    const tokenService = new TokenService({
        appConfig: fakeAppConfig
    });
    it.only("todo", () => {
        const test = {a: 10};
        const x = tokenService.getAccessToken(test);
        console.log(x);
        const b = tokenService.verifyAccessToken(x);
        console.log(b);
    })
})