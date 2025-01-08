import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HealthResDto } from './res/health.res.dto';

@ApiTags('8.Health')
@Controller('health')
export class HealthController {
  @Get()
  public health(): HealthResDto {
    return { status: 'healthy' };
  }
}
