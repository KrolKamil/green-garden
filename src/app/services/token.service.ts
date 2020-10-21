import {sign, verify} from 'jsonwebtoken';
import { AppConfig } from '../../../config/app';

interface TokenServiceDependencies {
    appConfig: AppConfig
}

export class TokenService {
    private accessTokenSecret: string;
    private refreshTokenSecret: string;

    constructor(dependencies: TokenServiceDependencies){
        this.accessTokenSecret = dependencies.appConfig.accessTokenSecret;
        this.refreshTokenSecret = dependencies.appConfig.refreshTokenSecret;
    }

    getAccessToken(payload: any){
        return sign(payload, this.accessTokenSecret, {expiresIn: "10m", noTimestamp: true});
    }

    getRefreshToken(payload: any){
        return sign(payload, this.refreshTokenSecret, {expiresIn: "1d", noTimestamp: true});
    }

    public verifyAccessToken(token: string) {
        return this.verify(token, this.accessTokenSecret);
    }
    
    public async verifyRefreshToken(token: string) {
        return this.verify(token, this.refreshTokenSecret);
      }
      
      private verify(token: string, tokenSecret: string) {
          const {exp, ...rest} = verify(token, tokenSecret) as any;
          console.log(exp);
          console.log(rest);
          return rest;
      }

}