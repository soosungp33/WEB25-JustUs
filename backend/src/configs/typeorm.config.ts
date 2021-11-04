import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import "dotenv/config";

export const typeORMConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.JUSTUS_MYSQL_HOST,
  port: +process.env.JUSTUS_MYSQL_PORT,
  username: process.env.JUSTUS_MYSQL_USER,
  password: process.env.JUSTUS_MYSQL_PASSWORD,
  database: process.env.JUSTUS_MYSQL_DATABASE,
  entities: [__dirname + process.env.JUSTUS_ENTITIY_PATH],
  synchronize: true, // false로 해두는 게 안전하다.
};
