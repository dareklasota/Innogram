import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'innogram_user',
            password: 'innogram_password',
            database: 'innogram',
            synchronize: false,
            entities: ['./../**/**.orm-entity{.ts,.js}'],
          });
          await dataSource.initialize();
          return dataSource;
        } catch (err) {
          console.error('Data source error');
          throw err;
        }
      }
    }
  ],
  exports: [DataSource]
})
export class TypeOrmModule {}
