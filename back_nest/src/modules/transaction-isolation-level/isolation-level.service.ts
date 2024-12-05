import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { isolationLevelsModel } from './model/levels.model';
import { MySQLConfigType } from '../../configs/envConfigType';

@Injectable()
export class IsolationLevelService {
  constructor(private readonly configService: ConfigService) {}

  public async set() {
    const isolation = plainToInstance(isolationLevelsModel, {
      level:
        this.configService.get<MySQLConfigType>('mysql')
          .transactionIsolationLevel,
    });
    const errors = await validate(isolation);
    if (errors.length > 0) {
      throw new NotAcceptableException([
        'Isolation level setting is not valid as mentioned below:',
        ...errors.map((error) => Object.values(error.constraints)).flat(),
      ]);
    }
    return isolation.level as IsolationLevel;
  }
}
