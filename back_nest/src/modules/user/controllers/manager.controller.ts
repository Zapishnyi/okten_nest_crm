import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('3.Manager')
@Controller('manager')
export class ManagerController {}
