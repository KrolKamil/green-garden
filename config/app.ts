export interface AppConfig {
  appName: string;
  port: string;
  env: string | undefined;
  hashRounds: number;
  accessTokenSecret: string;
  refreshTokenSecret: string;
}

export const appConfigFactory = (env: any): AppConfig => ({
  appName: env.APP_NAME ?? "boilerplate_api",
  port: env.PORT ?? "1337",
  env: env.NODE_ENV ?? "development",
  hashRounds: parseInt(env.HASH_ROUNDS || 8, 10),
  accessTokenSecret: env.ACCESS_TOKEN_SECRET ?? "",
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET ?? "",
});
