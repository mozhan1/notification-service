import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { FirebaseService } from '@infrastructure/firebase/firebase-service';
/**
 * A guard that checks if the request is coming from an authenticated user.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  private readonly logger = new Logger( AuthGuard.name );

  constructor( private firebaseService : FirebaseService ) {}

  /**
   * Checks if the session is valid.
   */
  async canActivate( context : ExecutionContext ) : Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader( req );

    if ( !token ) {
      throw new UnauthorizedException();
    }
    try {
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      const isAuthenticatedRequest = await this.firebaseService.verifyIdToken( token );

      if ( isAuthenticatedRequest.isOk() ) {
        req.decodedIdToken = isAuthenticatedRequest.unwrap();
        this.logger.log( `User authenticated successfully : User ${req.decodedIdToken.uid}` );
        return true;
      }

    } catch ( error ) {
      throw new UnauthorizedException();
    }
    return false;
  }

  private extractTokenFromHeader( request : FastifyRequest ) : string | undefined {

    const [type, token] = request.headers.authorization?.split( ' ' ) ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
