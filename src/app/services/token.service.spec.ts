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
    it("sign and usign by accessToken", () => {
        const target = {x: 'test'};
        const targetSigned = tokenService.getAccessToken(target);
        const targetUnsigned = tokenService.verifyAccessToken(targetSigned);
        expect(targetUnsigned).to.be.deep.equal(target);
    });
    it("sign and usign by refreshToken", () => {
        const target = {x: 'test'};
        const targetSigned = tokenService.getRefreshToken(target);
        const targetUnsigned = tokenService.verifyRefreshToken(targetSigned);
        expect(targetUnsigned).to.be.deep.equal(target);
    })
})