import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';

export function createWinstonConfig() {
  const env = process.env.NODE_ENV || 'development';

  const isProduction = env === 'production';

  const isStaging = env === 'staging';

  const transports : ConsoleTransportInstance[] = [];

  if ( isProduction || isStaging ) {
    transports.push(
      new winston.transports.Console( {
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      } ),
    );
  } else {
    transports.push(
      new winston.transports.Console( {
        format: winston.format.combine(
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      } ),
    );
  }

  return {
    level: isProduction || isStaging ? 'info' : 'debug',
    transports,
  };
}
