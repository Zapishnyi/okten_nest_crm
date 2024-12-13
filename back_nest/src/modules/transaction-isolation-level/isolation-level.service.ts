import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';
import { plainToInstance } from 'class-transformer';
import { isolationLevelsModel } from './model/levels.model';
import { MySQLConfigType } from '../../configs/envConfigType';
import { IsolationLevelsEnum } from './enums/isolationLevels.enum';

@Injectable()
export class IsolationLevelService {
  constructor(private readonly configService: ConfigService) {}

  public set() {
    const isolation = plainToInstance(isolationLevelsModel, {
      level:
        this.configService.get<MySQLConfigType>('mysql')
          .transactionIsolationLevel,
    });
    const isValid = Object.values(IsolationLevelsEnum).includes(
      isolation.level as IsolationLevelsEnum,
    );
    if (!isValid) {
      throw new NotAcceptableException(
        'Isolation level must be: "READ UNCOMMITTED","READ COMMITTED","REPEATABLE READ" or"SERIALIZABLE"',
      );
    }
    return isolation.level as IsolationLevel;
  }
}
