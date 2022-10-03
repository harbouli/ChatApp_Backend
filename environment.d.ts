declare namespace NodeJS {
  export interface processEnv {
    MYSQL_DB_USER?: string;
    MYSQL_DB_PASSWORD?: string;
    MYSQL_DB_PORT?: number;
    MYSQL_DB_DATABASE?: string;
    MYSQL_DB_HOST?: string;
  }
}
