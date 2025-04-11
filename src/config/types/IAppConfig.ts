export interface IAppConfig {
    app: {
      port: number;
      nodeEnv: string;
      allowedOrigin: string;
    };
    db: {
      mongoUri: string;
      redisHost: string;
      redisPort: number;
      redisPassword: string;
    };
    auth: {
      xServiceKey: string;
      xSignatureKey: string;
      jwtSecret: string;
    };
  }
  