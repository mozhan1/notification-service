import { ArgumentsHost, Catch, Logger, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { FastifyReply } from 'fastify';

/**
 * Global exception filter for handling all uncaught exceptions across the application.
 *
 * This filter serves as the last line of defense for catching exceptions that are not
 * explicitly handled by the application's controllers or services. Its primary role is to
 * ensure that no exception goes unlogged ,results in an uninformative response to the client or
 * avoid the application to crash. It is designed to handle all types of exceptions.
 * thereby maintaining a consistent error response structure and facilitating easier debugging and monitoring.
 *
 * @extends {BaseExceptionFilter} Leveraging NestJS's built-in exception filtering capabilities to extend
 * and customize the handling of exceptions globally.
 */
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  
  private readonly logger = new Logger( AllExceptionsFilter.name );

  /**
   * Catches and processes all unhandled exceptions thrown during the handling of requests.
   * We need to enrich the exception filter.
   *
   * @param exception The exception object caught by NestJS's global exception layer.
   * @param host
   */
  catch( exception : unknown, host : ArgumentsHost ) {
    const context = host.switchToHttp();
    const reply = context.getResponse<FastifyReply>();

    if ( exception instanceof UnauthorizedException ) {
      this.handleUnauthorizedException( exception, reply );
      return;
    }

    this.logger.error( {
      message: `An error occurred, message `,
      exception: exception,
      stack: exception instanceof Error ? exception.stack : null,
    } );
  }

  private handleUnauthorizedException( exception : UnauthorizedException, response : FastifyReply ) {
    const status = exception.getStatus();
    this.logger.error( `Unauthorized access ${exception.message}` );
    response.code( status ).send( {
      statusCode: status,
      message: exception.message || 'Unauthorized access.',
    } );
  }
}
