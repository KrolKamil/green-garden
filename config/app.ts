export interface AppConfig {
  appName: string;
  port: string;
  env: string | undefined;
  hashRounds: number;
  accessTokenSecret: string;
  refreshTokenSecret: string;
  mailHost: string;
  mailPort: number;
  mailFrom: string;
  frontendRegisterUserLink: string;
}

export const appConfigFactory = (env: any): AppConfig => ({
  appName: env.APP_NAME ?? "boilerplate_api",
  port: env.PORT ?? "1337",
  env: env.NODE_ENV ?? "development",
  hashRounds: parseInt(env.HASH_ROUNDS || 8, 10),
  accessTokenSecret: env.ACCESS_TOKEN_SECRET ?? "",
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET ?? "",
  mailHost: env.MAIL_HOST ?? "",
  mailPort: env.MAIL_PORT ?? 0,
  mailFrom: env.MAIL_FROM ?? "",
  frontendRegisterUserLink: env.FRONTEND_REGISTER_USER_LINK ?? ""
});
