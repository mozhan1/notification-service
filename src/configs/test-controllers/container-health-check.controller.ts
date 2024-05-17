import { Controller, Get } from '@nestjs/common';
/*
* AWS Health check
* */
@Controller( 'health' )
export class HealthController {
  @Get()
  checkHealth() : any {
    return {
      status: 'up',
      timestamp: new Date().toISOString(),
    };
  }
}
