import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // Additional configuration...

  const PORT = Number( process.env.PORT || 3000 );

  const HOST = '0.0.0.0'; // Bind to all network interfaces

  await app.listen( PORT, HOST, () => {
    console.log( `Server running on https://${HOST}:${PORT}/` );
  } );
}

bootstrap();
