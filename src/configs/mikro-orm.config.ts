import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';

export default defineConfig( {
  host: 'account.cjh651ks1viu.us-east-2.rds.amazonaws.com', // 'accounts-db.cb066mk6e545.us-east-2.rds.amazonaws.com
  port: 5432,
  entities: ['./**/*.data-model.js'],
  entitiesTs: ['./**/*.data-model.ts'],
  dbName: 'account',
  user: 'stagewoodAdmin',
  schema: 'account',
  password: 'd.3.6:E<AZ6N8aEmr*V(VESSGIz>',
  driverOptions: {
    connection: {
      ssl:  { rejectUnauthorized: false },
    }
  },
  extensions: [Migrator, SeedManager],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    pathTs: undefined, // path to the folder with TS migrations (if used, you should put path to compiled files in `path`)
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: false, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    snapshot: true, // save snapshot when creating new migrations
    emit: 'ts', // migration generation mode
    generator: TSMigrationGenerator, // migration generator, e.g. to allow custom formatting
  },

  seeder: {
    path: 'src/infrastructure/mikro-orm/database/seed', // path to the folder with seeders
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
  },
  driver: PostgreSqlDriver,

  debug: true,
} );

