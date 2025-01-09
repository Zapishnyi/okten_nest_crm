import { Injectable } from '@nestjs/common';

import { GroupEntity } from '../../../database/entities/group.entity';
import { GroupResDto } from '../dto/res/group.res.dto';

@Injectable()
export class GroupPresenterService {
  public toResponseDto({ name, created_at, id }: GroupEntity): GroupResDto {
    return {
      id,
      name,
      created_at,
    };
  }
}
