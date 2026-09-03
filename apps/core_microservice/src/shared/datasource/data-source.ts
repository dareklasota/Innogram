import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'innogram_user',
  password: 'innogram_password',
  database: 'innogram',
  synchronize: false,
  entities: ['$./../../**/**.orm-entity{.ts,.js}'],
  migrations: ['$./migrations/*{.ts,.js}']
});
