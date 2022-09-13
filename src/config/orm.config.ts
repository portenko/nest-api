import config from './index';
import { User } from '../app/user/entities/user.entity';
import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.name,
  //autoLoadEntities: true,
  synchronize: false,
  entities: [User], // array of entities
  migrations: [path.resolve(__dirname, '../migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  migrationsRun: false,
};

export default postgresConnectionOptions;
